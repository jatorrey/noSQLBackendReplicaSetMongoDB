const express = require('express');
const router = express.Router();
const clienteController = require('../controllers/cliente.controller');

// RUTAS PARA CRUD DE CLIENTES
router.get('/clientes', clienteController.obtenerClientes); // Esto retorna todos los clientes
router.get('/clientes/:clienteId', clienteController.obtenerClientePorId); // Esto retorna un cliente especifico
router.post('/clientes', clienteController.insertarCliente); // Esto inserta un nuevo cliente
router.post('/clientes/many', clienteController.insertarClientes); // Esto inserta muchos clientes
router.put('/clientes/:clienteId', clienteController.actualizarCliente); // Esto actualiza un cliente
router.delete('/clientes/:clienteId', clienteController.eliminarCliente); // Esto elimina un cliente

// RUTAS PARA CRUD DE ENVIOS
router.get('/clientes/envios/:id', clienteController.obtenerEnvios); // Esto retorna todos los envios
router.get('/clientes/envios/:clienteId/:envioId', clienteController.obtenerEnvioPorId); // Esto retorna un envio especifico
router.post('/clientes/envios/:clienteId', clienteController.insertarEnvio); // Esto inserta un nuevo envio
router.put('/clientes/envios/:clienteId/:envioId', clienteController.actualizarEnvio); // Esto actualiza un envio
router.delete('/clientes/envios/:clienteId/:envioId', clienteController.eliminarEnvio); // Esto elimina un envio

// RUTAS DE LAS QUERYS
router.get('/clientes/envios/oficina/:oficinaId/transito', clienteController.listarEnviosPorOficinaYTransito);
router.get('/envios/tipo/:tipoEnvio', clienteController.listarEnviosPorTipo);
router.get('/envios/cliente/:clienteId', clienteController.listarEnviosPorCliente);
router.get('/clientes/oficina/:oficinaId', clienteController.listarClientesPorOficina);
router.get('/envios/entregados', clienteController.listarEnviosEntregados);
router.get('/clientes/envios-te1', clienteController.getClientesConEnviosTE1);
router.get('/clientes/envios/express/oficina/:oficinaId', clienteController.listarClientesPorEnviosExpressYOficina);

module.exports = router;