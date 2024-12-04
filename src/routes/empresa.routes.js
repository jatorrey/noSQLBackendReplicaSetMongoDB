const express = require('express');
const router = express.Router();
const empresaController = require('../controllers/empresa.controller');

// RUTAS PARA CRUD DE EMPRESAS
router.get('/empresas/', empresaController.obtenerEmpresas); // Esto retorna todas las empresas
router.get('/empresas/:empresaId', empresaController.obtenerEmpresaEspecifica); // Esto retorna una empresa especifica
router.post('/empresas/', empresaController.insertarEmpresa); // Esto inserta una nueva empresa
router.put('/empresas/:empresaId', empresaController.actualizarEmpresa); // Esto actualiza una empresa
router.delete('/empresas/:empresaId', empresaController.eliminarEmpresa); // Esto elimina una empresa

// RUTAS PARA CRUD DE OFICINAS
router.get('/empresas/oficinas/:id', empresaController.obtenerOficinas); // Esto retorna todas las oficinas
router.get('/empresas/oficinas/:empresaId/:oficinaId', empresaController.obtenerOficinaEspecifica); // Esto retorna una oficina especifica
router.post('/empresas/oficinas/:empresaId', empresaController.insertarOficina); // Esto inserta una nueva oficina
router.put('/empresas/oficinas/:empresaId/:oficinaId', empresaController.actualizarOficina); // Esto actualiza una oficina
router.delete('/empresas/oficinas/:empresaId/:oficinaId', empresaController.eliminarOficina); // Esto elimina una oficina

// RUTAS PARA CRUD DE TIPOS DE ENVIO
router.get('/empresas/tiposEnvio/:empresaId', empresaController.obtenerTiposEnvio); // Esto retorna todos los tipos de envio
router.get('/empresas/tiposEnvio/:empresaId/:tipoEnvioId', empresaController.obtenerTipoEnvioEspecifico); // Esto retorna un tipo de envio especifico
router.post('/empresas/tiposEnvio/:empresaId', empresaController.insertarTipoEnvio); // Esto inserta un nuevo tipo de envio
router.put('/empresas/tiposEnvio/:empresaId/:tipoEnvioId', empresaController.actualizarTipoEnvio); // Esto actualiza un tipo de envio
router.delete('/empresas/tiposEnvio/:empresaId/:tipoEnvioId', empresaController.eliminarTipoEnvio); // Esto elimina un tipo de envio

// RUTA PARA RESOLUCION DE QUERY 1
router.get('/empresas/:id/oficinas', empresaController.listarOficinas); // Esto retorna todas las oficinas de todas las empresas

// EXPORTAR EL ROUTER
module.exports = router;