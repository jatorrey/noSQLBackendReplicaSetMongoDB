require('dotenv').config();                                         // Carga las variables de entorno desde el archivo .env
const express = require('express');                                 // Framework para construir aplicaciones web y APIs
const cors = require('cors');                                       // Middleware para permitir solicitudes de recursos cruzados
const morgan = require('morgan');                                   // Middleware para registrar solicitudes HTTP
const logger = require('./middleware/logger');                      // Middleware personalizado para registrar solicitudes en Redis
const { mongoose, redisClient } = require('./config/db.config');    // Configuración de MongoDB y Redis

// Importando las rutas
const empresaRoutes = require('./routes/empresa.routes');
const clienteRoutes = require('./routes/cliente.routes');

// Creando instancia de app Express
const app = express();

// Middleware para parsear solicitudes JSON
app.use(express.json());

// Middleware para permitir solicitudes de recursos cruzados
app.use(cors());

// Middleware para registrar solicitudes HTTP
app.use(morgan('dev'));

// Middleware personalizado para registrar solicitudes en Redis
app.use(logger);

// Rutas importadas
app.use('/api', [empresaRoutes, clienteRoutes]);

// Definiendo el puerto en el que app escucha solicitudes
const PORT = process.env.PORT || 3000;

// Iniciando el servidor
app.listen(PORT, () => {
    console.log(`🚀 Servidor escuchando en el puerto ${PORT}`);
});