const { Producto } = require('../models/index');

// GET — listar todos los productos activos (para el frontend)
const listarProductos = async (req, res) => {
    try {
        const productos = await Producto.findAll({
            where: { activo: true }
        });
        res.json({ ok: true, data: productos });
    } catch (error) {
        res.status(500).json({ ok: false, mensaje: 'Error al obtener productos' });
    }
};

// GET — listar todos (activos e inactivos, para el admin)
const listarTodos = async (req, res) => {
    try {
        const productos = await Producto.findAll();
        res.json({ ok: true, data: productos });
    } catch (error) {
        res.status(500).json({ ok: false, mensaje: 'Error al obtener productos' });
    }
};

// GET — obtener uno por id
const obtenerProducto = async (req, res) => {
    try {
        const producto = await Producto.findByPk(req.params.id);
        if (!producto) {
            return res.status(404).json({ ok: false, mensaje: 'Producto no encontrado' });
        }
        res.json({ ok: true, data: producto });
    } catch (error) {
        res.status(500).json({ ok: false, mensaje: 'Error al obtener el producto' });
    }
};

// POST — crear producto
const crearProducto = async (req, res) => {
    console.log("ENTRO A CREAR PRODUCTO");
    try {

        console.log("BODY:", req.body);
        console.log("FILE:", req.file);

        const { nombre, precio, tipo } = req.body;
        const imagen = req.file ? req.file.filename : null;

        const producto = await Producto.create({
            nombre,
            precio,
            tipo,
            imagen,
            activo: true
        });

        res.status(201).json({
            ok: true,
            data: producto
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            ok: false,
            mensaje: error.message
        });

    }
};

// PUT — modificar producto
const modificarProducto = async (req, res) => {
    try {
        const producto = await Producto.findByPk(req.params.id);
        if (!producto) {
            return res.status(404).json({ ok: false, mensaje: 'Producto no encontrado' });
        }

        const { nombre, precio, tipo } = req.body;
        const imagen = req.file ? req.file.filename : producto.imagen;

        await producto.update({ nombre, precio, tipo, imagen });

        res.json({ ok: true, data: producto });
    } catch (error) {
        res.status(500).json({ ok: false, mensaje: 'Error al modificar el producto' });
    }
};

// PATCH — cambiar estado activo/inactivo (baja logica)
const cambiarEstado = async (req, res) => {
    try {
        const producto = await Producto.findByPk(req.params.id);
        if (!producto) {
            return res.status(404).json({ ok: false, mensaje: 'Producto no encontrado' });
        }

        await producto.update({ activo: !producto.activo });

        res.json({ ok: true, data: producto });
    } catch (error) {
        res.status(500).json({ ok: false, mensaje: 'Error al cambiar el estado' });
    }
};

module.exports = {
    listarProductos,
    listarTodos,
    obtenerProducto,
    crearProducto,
    modificarProducto,
    cambiarEstado
};