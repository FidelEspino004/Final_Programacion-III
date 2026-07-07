const { Ticket, DetalleVenta, Producto } = require('../models/index');
const db = require('../data/db');

// POST — crear ticket (venta) con sus detalles
const crearTicket = async (req, res) => {
    const t = await db.transaction();
    try {
        const { nombre_usuario, productos } = req.body;

        if (!nombre_usuario || !Array.isArray(productos) || productos.length === 0) {
            await t.rollback();
            return res.status(400).json({ ok: false, mensaje: 'Faltan datos del ticket o productos' });
        }

        let total = 0;
        const detallesAInsertar = [];

        // Buscamos cada producto en la BD para tomar su precio REAL (no confiamos en el del frontend)
        for (const item of productos) {
            const producto = await Producto.findByPk(item.id_producto, { transaction: t });

            if (!producto || !producto.activo) {
                await t.rollback();
                return res.status(400).json({
                    ok: false,
                    mensaje: `El producto con id ${item.id_producto} no existe o no está disponible`
                });
            }

            const subtotal = producto.precio * item.cantidad;
            total += subtotal;

            detallesAInsertar.push({
                id_producto: producto.id_producto,
                cantidad: item.cantidad,
                precio_unitario: producto.precio
            });
        }

        // Creamos el ticket con el total ya calculado
        const nuevoTicket = await Ticket.create({
            nombre_usuario,
            total
        }, { transaction: t });

        // Creamos todos los detalles asociados a ese ticket
        for (const detalle of detallesAInsertar) {
            await DetalleVenta.create({
                ...detalle,
                id_ticket: nuevoTicket.id_ticket
            }, { transaction: t });
        }

        await t.commit();

        res.status(201).json({ ok: true, data: nuevoTicket });

    } catch (error) {
        await t.rollback();
        console.error(error);
        res.status(500).json({ ok: false, mensaje: 'Error al crear el ticket' });
    }
};

// GET — listar todos los tickets con sus productos asociados
const listarTickets = async (req, res) => {
    try {
        const tickets = await Ticket.findAll({
            include: [{
                model: DetalleVenta,
                include: [Producto]
            }]
        });
        res.json({ ok: true, data: tickets });
    } catch (error) {
        res.status(500).json({ ok: false, mensaje: 'Error al obtener los tickets' });
    }
};

// GET — obtener un ticket puntual (para mostrar la pantalla de ticket, por ejemplo)
const obtenerTicket = async (req, res) => {
    try {
        const ticket = await Ticket.findByPk(req.params.id, {
            include: [{
                model: DetalleVenta,
                include: [Producto]
            }]
        });

        if (!ticket) {
            return res.status(404).json({ ok: false, mensaje: 'Ticket no encontrado' });
        }

        res.json({ ok: true, data: ticket });
    } catch (error) {
        res.status(500).json({ ok: false, mensaje: 'Error al obtener el ticket' });
    }
};

module.exports = {
    crearTicket,
    listarTickets,
    obtenerTicket
};