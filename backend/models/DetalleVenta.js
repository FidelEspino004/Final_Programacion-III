const { DataTypes } = require('sequelize');
const db = require('../data/db');

const DetalleVenta = db.define('detalle_venta', {
    id_detalle: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    cantidad: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    precio_unitario: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    }
}, {
    tableName: 'detalle_venta',
    timestamps: false
});

module.exports = DetalleVenta;