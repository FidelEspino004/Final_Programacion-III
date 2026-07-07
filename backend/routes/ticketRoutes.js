const express = require('express');
const router = express.Router();
const {
    crearTicket,
    listarTickets,
    obtenerTicket
} = require('../controllers/ticketController');

router.get('/', listarTickets);
router.get('/:id', obtenerTicket);
router.post('/', crearTicket);

module.exports = router;