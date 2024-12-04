const mongoose = require('mongoose');
const redis = require('redis');
require('dotenv').config();

// Realizando conexion a MongoDB
mongoose.connect(process.env.MONGO_URI).then(() => {
    console.log('Conectado a MongoDB');
}).catch((error) => {
    console.error('Error al conectar a MongoDB: ', error);
});

// Configuracion de Redis
const redisClient = redis.createClient({
    url: `redis://${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`
});

redisClient.on('error', (err) => {
    console.error('Redis error de conexion: ', err);
});

redisClient.connect().then(() => {
    console.log('Conectado a Redis');
}).catch((err) => {
    console.error('Error al conectar a Redis: ', err);
});

module.exports = { mongoose, redisClient };