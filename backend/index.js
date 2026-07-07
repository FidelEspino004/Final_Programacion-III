const express = require('express');
const session = require('express-session');
const path = require('path');
require('dotenv').config();

const db = require('./data/db');
const { Producto, Ticket, DetalleVenta, Usuario } = require('./models/index');

const productoRoutes = require('./routes/productoRoutes');
const ticketRoutes = require('./routes/ticketRoutes');   
const usuarioRoutes = require('./routes/usuarioRoutes'); 
const viewRoutes = require("./routes/viewRoutes");


const app = express();
const PORT = process.env.PORT || 3000;

// ===== Middlewares =====
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// ===== Sesión =====
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}));

// ===== Motor de vistas EJS =====
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// ===== Rutas =====
app.use('/api/productos', productoRoutes);
app.use('/api/tickets', ticketRoutes);
app.use('/api/usuarios', usuarioRoutes);
app.use("/admin", viewRoutes);

// ===== Conexión a la base de datos =====
db.authenticate()
    .then(() => {
        console.log('Conectado a MySQL correctamente');
        return db.sync({ alter: true });
    })
    .then(() => {
        console.log('Tablas sincronizadas');
        app.get("/", (req, res) => {
            res.send("Servidor funcionando correctamente");
        });
        app.listen(PORT, () => {
            console.log(`Servidor corriendo en http://localhost:${PORT}`);
        });
    })
    .catch(error => {
        console.error('Error al conectar la base de datos:', error);
    });