const express = require("express");
console.log("ViewRoutes cargadas");
const router = express.Router();

const {
    mostrarLogin,
    mostrarDashboard,
    mostrarAltaProducto
} = require("../controllers/viewController");

router.get("/login", mostrarLogin);

router.get("/dashboard", mostrarDashboard);

router.get("/productos/nuevo", mostrarAltaProducto);

module.exports = router;