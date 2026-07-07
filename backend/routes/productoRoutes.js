const express = require('express');
const router = express.Router();
const upload = require('../middlewares/multerConfig');
const {
    listarProductos,
    listarTodos,
    obtenerProducto,
    crearProducto,
    modificarProducto,
    cambiarEstado
} = require('../controllers/productoController');

// Rutas publicas (frontend)
router.get('/', listarProductos);
router.get('/todos', listarTodos);
router.get('/:id', obtenerProducto);

// Rutas admin
router.post('/', upload.single('imagen'), crearProducto);
router.put('/:id', upload.single('imagen'), modificarProducto);
router.patch('/:id/estado', cambiarEstado);

module.exports = router;