const mongoose = require('mongoose');

// Esquema de Cliente

const ClienteSchema = new mongoose.Schema({
  _id: { type: String, required: true }, // CURP del cliente
  nombre: { type: String, required: true }, // Nombre del cliente
  apellidos: { type: String, required: true }, // Apellidos del cliente
  email: { type: String, required: true }, // Correo electrónico del cliente
  envios: [{
    _id: { type: String, required: true }, // ID único del envío
    fechaEnvio: { type: Date, required: true }, // Fecha en la que se realizó el envío
    origen: { type: String, required: true }, // ID de la oficina de origen
    destino: { type: String, required: true }, // ID de la oficina de destino
    tipoEnvio: { type: String, required: true }, // ID del tipo de envío
    peso: { type: Number, required: true }, // Peso del paquete en kilogramos
    dimensiones: {
      alto: { type: Number, required: true }, // Altura en cm
      ancho: { type: Number, required: true }, // Ancho en cm
      largo: { type: Number, required: true }, // Largo en cm
    },
    costoTotal: { type: Number, required: true }, // Costo total del envío
    estatus: {
      type: String,
      enum: ['pendiente', 'transito', 'entregado'], // Valores permitidos para el estatus
      required: true,
    },
  }] // Referencia a los envíos
});

// Modelos
const Cliente = mongoose.model('Cliente', ClienteSchema);

module.exports = { Cliente };
