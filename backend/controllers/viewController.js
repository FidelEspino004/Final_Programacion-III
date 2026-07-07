const { Producto } = require("../models");

const mostrarLogin = (req, res) => {

    res.render("login");

};

const mostrarDashboard = async (req, res) => {

    const productos = await Producto.findAll();

    res.render("dashboard", {
        productos
    });

};

const mostrarAltaProducto = (req, res) => {

    res.render("producto-form");

};

module.exports = {
    mostrarLogin,
    mostrarDashboard,
    mostrarAltaProducto
};