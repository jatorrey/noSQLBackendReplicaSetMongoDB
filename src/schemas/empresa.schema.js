const mongoose = require('mongoose');

// Esquema para la Empresa
const EmpresaSchema = new mongoose.Schema({
  _id: { type: String, required: true }, // ID único de la empresa (por ejemplo, "DHL")
  nombre: { type: String, required: true }, // Nombre de la empresa
  oficinas: [{
    _id: { type: String, required: true }, // ID único de la oficina
    nombre: { type: String, required: true }, // Nombre de la oficina
    direccion: {
      calle: { type: String, required: true },
      numero: { type: Number, required: true },
      ciudad: { type: String, required: true },
      codigoPostal: { type: String, required: true },
    },
    telefono: { type: String, required: true }, // Teléfono de la oficina
    email: { type: String, required: true }, // Correo electrónico de la oficina
  }], // Referencia a oficinas
  tiposEnvio: [{
    _id: { type: String, required: true }, // ID único del tipo de envío
    descripcion: { type: String, required: true }, // Descripción (ejemplo: "Terrestre")
    precioPorKm: { type: Number, required: true }, // Precio por kilómetro
    tiempoEstimado: { type: String, required: true }, // Tiempo estimado de entrega
  }], // Referencia a tipos de envío
});

const Empresa = mongoose.model('Empresa', EmpresaSchema);

// Exportar los modelos
module.exports = { Empresa };
