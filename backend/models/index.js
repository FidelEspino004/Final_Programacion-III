const Producto = require('./Producto');
const Ticket = require('./Ticket');
const DetalleVenta = require('./DetalleVenta');
const Usuario = require('./Usuario');

// Un ticket tiene muchos detalles
Ticket.hasMany(DetalleVenta, { foreignKey: 'id_ticket' });
DetalleVenta.belongsTo(Ticket, { foreignKey: 'id_ticket' });

// Un producto tiene muchos detalles
Producto.hasMany(DetalleVenta, { foreignKey: 'id_producto' });
DetalleVenta.belongsTo(Producto, { foreignKey: 'id_producto' });

module.exports = { Producto, Ticket, DetalleVenta, Usuario };