const bcrypt = require("bcrypt");
const { Usuario } = require("../models");

// Registrar administrador

const registrar = async (req, res) => {

    try {

        const { email, password } = req.body;

        // Verificar si ya existe
        const existe = await Usuario.findOne({
            where: { email }
        });

        if (existe) {

            return res.status(400).json({
                ok: false,
                mensaje: "Ese correo ya está registrado."
            });

        }

        // Encriptar contraseña
        const passwordHash = await bcrypt.hash(password, 10);

        // Crear usuario
        const usuario = await Usuario.create({
            email,
            password: passwordHash
        });

        res.status(201).json({
            ok: true,
            mensaje: "Administrador creado correctamente.",
            data: usuario
        });

    } catch (error) {

        res.status(500).json({
            ok: false,
            mensaje: error.message
        });

    }

};

// Login

const login = async (req, res) => {

    try {

        const { email, password } = req.body;

        const usuario = await Usuario.findOne({
            where: { email }
        });

        if (!usuario) {

            return res.status(404).json({
                ok: false,
                mensaje: "Usuario no encontrado."
            });

        }

        const coincide = await bcrypt.compare(
            password,
            usuario.password
        );

        if (!coincide) {

            return res.status(401).json({
                ok: false,
                mensaje: "Contraseña incorrecta."
            });

        }

        //req.session.usuario = usuario.id_usuario;

        res.json({
            ok: true,
            mensaje: "Login correcto."
        });

    } catch (error) {

        res.status(500).json({
            ok: false,
            mensaje: error.message
        });

    }

};

module.exports = {
    registrar,
    login
};