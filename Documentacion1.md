# Torres Reyes Jaime Camil.

# Bases de Datos noSQL, documentacion del proyecto final.

# Parte 0. Conexion de extensión MongoDB a nuestra imagen.

Para realizar una conexión desde nuestro VS Code hacia una base de datos en MongoDB, 
primero debemos de instalar la extensión oficial ed MongoDB que encontramos en el
marketplace de extensiones, donde después, abriendo el ícono de la extensión, nos
muestra un menú intuitivo para realizar una conexión, mediante una String de
conexión directa.

# Parte 1. Playground y resolucion de ejercicios.

## Parte1.1 Enunciado del CASO01 a resolver.

//En esta parte insertar el enunciado del caso01

## Parte 1.2 Definición de colecciones.

La manera en la que decidí resolver la problemática, fue crear dos
colecciones principales, la colección "empresa" y la colección
"clientes", donde:
Empresa cuenta con los siguientes puntos:
    - id de la empresa
    - Nombre de la empresa
    - Subdocumento "oficinas", que cuenta con:
        - id de la oficina
        - Nombre de la oficina
        - Direccion, que cuenta con los campos "calle", "numero", "ciudad" y "codigoPostal".
        - Telefono de contacto
        - e-mail de contacto
    - Subdocumento "tiposEnvio", que cuenta con:
        - id del tipo
        - Descripción del tipo
        - Precio por km
        - Tiempo estimado
Clientes cuenta con los siguientes puntos:
    - id del cliente, que en este caso será su CURP
    - Nombre del cliente
    - Apellidos del cliente
    - e-mail de contacto
    - Arreglo de subdocumento "envios", que cuenta con:
        - id del envío
        - fecha del envío
        - oficina origen
        - oficina destino
        - tipo de envío
        - peso del paquete
        - dimensiones del paquete, que cuenta con los campos "alto", "ancho", y "largo"
        - costo total del paquete
        - estatus del envío, con opciones de "pendiente", "transito", "entregado".

## Parte 1.3 Inserción de datos de ejemplo para desarrollar las Querys.

 A continuación, listamos los dos comandos que hemos diseñado para insertar
 datos a nuestra colección de empresa, así como a la colección clientes.
 Empresa:

 db.empresa.insertOne({
  _id: "DHL", 
  nombre: "DHL", 
  oficinas: [

    {
      _id: "OF1",
      nombre: "Oficina CDMX",
      direccion: { calle: "Insurgentes", numero: 123, ciudad: "Ciudad de México", codigoPostal: "01000" },
      telefono: "555-123-4567",
      email: "cdmx@dhl.com"
    },
    {
      _id: "OF2",
      nombre: "Oficina Guadalajara",
      direccion: { calle: "Av. Vallarta", numero: 456, ciudad: "Guadalajara", codigoPostal: "44100" },
      telefono: "333-987-6543",
      email: "gdl@dhl.com"
    },
    {
      _id: "OF3",
      nombre: "Oficina Tepic",
      direccion: { calle: "Av. Tepic", numero: 789, ciudad: "Tepic", codigoPostal: "63000" },
      telefono: "311-422-5612",
      email: "tepic@dhl.com"
    }

  ], 
  tiposEnvio: [

    { _id: "TE1", descripcion: "Terrestre", precioPorKm: 5.0, tiempoEstimado: "3-5 días" },
    { _id: "TE2", descripcion: "Aéreo", precioPorKm: 10.0, tiempoEstimado: "1-2 días" },
    { _id: "TE3", descripcion: "Express", precioPorKm: 15.0, tiempoEstimado: "24 horas" }

  ]
}); 

Clientes:

db.clientes.insertMany([
  {

    _id: "CURP123456HDFABC01",
    nombre: "Juan",
    apellidos: "Pérez Gómez",
    email: "juan.perez@gmail.com",
    envios: [
      {
        _id: "ENV001",
        fechaEnvio: new Date("2020-11-15"),
        origen: "OF1",
        destino: "OF2",
        tipoEnvio: "TE1",
        peso: 10.5,
        dimensiones: { alto: 50, ancho: 30, largo: 20 },
        costoTotal: 500.0,
        estatus: "pendiente"
      },
      {
        _id: "ENV003",
        fechaEnvio: new Date("2019-11-15"),
        origen: "OF3",
        destino: "OF1",
        tipoEnvio: "TE2",
        peso: 5.2,
        dimensiones: { alto: 30, ancho: 35, largo: 25 },
        costoTotal: 750.0,
        estatus: "transito"
      }
    ]

  }, 
  {

    _id: "CURP567890HDFRST05",
    nombre: "Luis",
    apellidos: "González Fernández",
    email: "luis.gonzalez@gmail.com",
    envios: [
      {
        _id: "ENV002",
        fechaEnvio: new Date("2018-11-15"),
        origen: "OF2",
        destino: "OF1",
        tipoEnvio: "TE3",
        peso: 7.0,
        dimensiones: { alto: 40, ancho: 25, largo: 15 },
        costoTotal: 1050.0,
        estatus: "entregado"
      }
    ]

  }, 
  {

    _id: "CURP901234HDFOPQ04",
    nombre: "Celeste",
    apellidos: "Vargas García",
    email: "celeste.vargas@gmail.com",
    envios: [
      {
        _id: "ENV004",
        fechaEnvio: new Date("2023-11-15"),
        origen: "OF1",
        destino: "OF3",
        tipoEnvio: "TE1",
        peso: 20.0,
        dimensiones: { alto: 60, ancho: 40, largo: 30 },
        costoTotal: 1500.0,
        estatus: "transito"
      }
    ]

  }, 
  {

    _id: "CURP678912HDFLMN03",
    nombre: "Ana",
    apellidos: "Martínez López",
    email: "ana.martinez@gmail.com",
    envios: [
      {
        _id: "ENV005",
        fechaEnvio: new Date("2024-02-20"),
        origen: "OF2",
        destino: "OF3",
        tipoEnvio: "TE2", // Aéreo
        peso: 3.0,
        dimensiones: { alto: 25, ancho: 20, largo: 15 },
        costoTotal: 300.0,
        estatus: "pendiente"
      },
      {
        _id: "ENV006",
        fechaEnvio: new Date("2023-06-15"),
        origen: "OF1",
        destino: "OF2",
        tipoEnvio: "TE3", // Express
        peso: 8.5,
        dimensiones: { alto: 40, ancho: 30, largo: 20 },
        costoTotal: 1200.0,
        estatus: "entregado"
      }
    ]

  }, 
  {

    _id: "CURP345678HDFXYZ02",
    nombre: "Carlos",
    apellidos: "Ramírez Hernández",
    email: "carlos.ramirez@gmail.com",
    envios: [
      {
        _id: "ENV007",
        fechaEnvio: new Date("2023-11-01"),
        origen: "OF3",
        destino: "OF1",
        tipoEnvio: "TE1", // Terrestre
        peso: 12.0,
        dimensiones: { alto: 60, ancho: 50, largo: 40 },
        costoTotal: 600.0,
        estatus: "transito"
      },
      {
        _id: "ENV008",
        fechaEnvio: new Date("2024-01-10"),
        origen: "OF2",
        destino: "OF1",
        tipoEnvio: "TE2", // Aéreo
        peso: 6.5,
        dimensiones: { alto: 35, ancho: 25, largo: 15 },
        costoTotal: 750.0,
        estatus: "pendiente"
      }
    ]

  }, 
  {

    _id: "CURP789012HDFJKL06",
    nombre: "María",
    apellidos: "Gutiérrez Velasco",
    email: "maria.gutierrez@gmail.com",
    envios: [
      {
        _id: "ENV009",
        fechaEnvio: new Date("2022-05-20"),
        origen: "OF1",
        destino: "OF2",
        tipoEnvio: "TE1", // Terrestre
        peso: 10.0,
        dimensiones: { alto: 50, ancho: 30, largo: 25 },
        costoTotal: 500.0,
        estatus: "entregado"
      },
      {
        _id: "ENV010",
        fechaEnvio: new Date("2024-03-01"),
        origen: "OF3",
        destino: "OF2",
        tipoEnvio: "TE3", // Express
        peso: 4.0,
        dimensiones: { alto: 30, ancho: 20, largo: 10 },
        costoTotal: 900.0,
        estatus: "pendiente"
      }
    ]

  }, 
  {

    _id: "CURP123890HDFLMO09",
    nombre: "Sofía",
    apellidos: "López Mendoza",
    email: "sofia.lopez@gmail.com",
    envios: [
      {
        _id: "ENV011",
        fechaEnvio: new Date("2021-12-15"),
        origen: "OF2",
        destino: "OF1",
        tipoEnvio: "TE2", // Aéreo
        peso: 15.0,
        dimensiones: { alto: 80, ancho: 60, largo: 40 },
        costoTotal: 2000.0,
        estatus: "entregado"
      },
      {
        _id: "ENV012",
        fechaEnvio: new Date("2024-01-05"),
        origen: "OF1",
        destino: "OF3",
        tipoEnvio: "TE1", // Terrestre
        peso: 7.0,
        dimensiones: { alto: 35, ancho: 30, largo: 20 },
        costoTotal: 400.0,
        estatus: "transito"
      }
    ]

  }      
]); 

## Parte 1.4 Desarrollo y resolución de los Querys.

### Query 1. Listar los datos de todas las oficinas.

db.empresa.find({}, { oficinas: 1 })

Explicación: Esta consulta busca en la colección empresa y devuelve únicamente el 
campo oficinas de todos los documentos. Es útil para obtener una lista de todas 
las oficinas registradas en la base de datos sin incluir otros datos de la empresa.

### Query 2. Listar los envíos realizados en determinada oficina con estatus "transito"

db.clientes.aggregate([
  { $unwind: "$envios" }, 
  { $match: { "envios.origen": "OF1", "envios.estatus": "transito" } }, 
  {

    $project: {
      _id: 1,
      nombre: 1,
      apellidos: 1,
      email: 1,
      envio: "$envios"
    }

  }
]); 

Explicación: Esta consulta utiliza aggregate para descomponer el array envios de 
cada cliente en documentos individuales con $unwind. Luego, filtra los envíos que 
tienen como origen la oficina "OF1" y están en estatus "transito". 
Finalmente, proyecta los campos deseados, incluyendo los detalles del envío.

### Query 3. Listar los envíos que utilizan un tipo específico de envío

db.clientes.find({ envios: { $elemMatch: { tipoEnvio: "TE1" } } }, { envios: { $elemMatch: { tipoEnvio: "TE1" } } })

Explicación: Esta consulta busca en la colección clientes aquellos documentos 
que contienen al menos un envío con tipoEnvio igual a "TE1". Utiliza $elemMatch 
para encontrar y devolver solo los envíos que coinciden con el criterio especificado.

### Query 4. Listar los envíos realizados por un cliente específico en todas las oficinas

db.clientes.find({ _id: "CURP123456HDFABC01" }, { envios: 1 })

Explicación: Esta consulta busca un cliente específico por su _id y 
devuelve todos los envíos asociados a ese cliente. Es útil para 
obtener un historial completo de envíos de un cliente en particular.

### Query 5. Listar los clientes que han realizado envíos en una determinada oficina

db.clientes.find(
  {

    envios: {
      $elemMatch: {
        $or: [
          { origen: "OF1" },
          { destino: "OF1" }
        ]
      }
    }

  }, 
  {

    _id: 1, // Solo si quieres incluir el ID del cliente
    nombre: 1,
    apellidos: 1,
    email: 1

  }
); 

Explicación: Esta consulta busca clientes que han realizado envíos donde la 
oficina "OF1" es el origen o el destino. Utiliza $elemMatch para encontrar 
envíos que cumplan con cualquiera de las condiciones especificadas y 
proyecta los datos básicos del cliente.

### Query 6. Listar los envíos de todas las oficinsa con estatus de entregado

db.clientes.find({ envios: { $elemMatch: { estatus: "entregado" } } }, { envios: 1 })

Explicación: Esta consulta busca en la colección clientes aquellos documentos 
que contienen envíos con estatus igual a "entregado". Devuelve todos los 
envíos de esos clientes, permitiendo revisar los envíos completados.

### Query 7. Listar los clientes y sus envíos que se han remitido por el servicio terrestre considerando todas las oficinas

db.clientes.aggregate([
  {

    $project: {
      _id: 1,
      nombre: 1,
      apellidos: 1,
      email: 1,
      envios: {
        $filter: {
          input: "$envios",
          as: "envio",
          cond: { $eq: ["$$envio.tipoEnvio", "TE1"] }
        }
      }
    }

  }, 
  {

    $match: {
      "envios.0": { $exists: true } // Filtra clientes que tengan al menos un envío terrestre
    }

  }
]); 

Explicación: Esta consulta utiliza aggregate para proyectar los clientes y filtrar sus 
envíos por tipoEnvio igual a "TE1" (terrestre). Luego, filtra los clientes que tienen 
al menos un envío terrestre, asegurando que solo se incluyan aquellos con envíos relevantes.

### Query 8. Listar los clientes y sus envíos que se han remitido por el servicio express considerando una oficina en específico

db.clientes.aggregate([
  {

    $match: {
      envios: {
        $elemMatch: {
          tipoEnvio: "TE3",
          $or: [
            { origen: "OF1" },
            { destino: "OF1" }
          ]
        }
      }
    }

  }, 
  {

    $project: {
      _id: 1,
      nombre: 1,
      apellidos: 1,
      email: 1,
      envios: {
        $filter: {
          input: "$envios",
          as: "envio",
          cond: {
            $and: [
              { $eq: ["$$envio.tipoEnvio", "TE3"] },
              {
                $or: [
                  { $eq: ["$$envio.origen", "OF1"] },
                  { $eq: ["$$envio.destino", "OF1"] }
                ]
              }
            ]
          }
        }
      }
    }

  }
]); 

Explicación: Esta consulta busca clientes que tienen envíos con tipoEnvio igual a 
"TE3" (express) y que involucran la oficina "OF1" como origen o destino. Utiliza 
aggregate para filtrar y proyectar solo los envíos que cumplen con estas 
condiciones, mostrando los datos del cliente y los envíos relevantes.

# Parte 2. Desarrollo del proyecto backend con Docker.

## Parte 2.0 Definición de la estructura del proyecto

Nuestro proyecto tiene la siguiente estructura de archivos:

  src/

    config/
      db.config.js
    controllers/
      cliente.controller.js
      empresa.controller.js
    middleware/
      logger.js
    routes/
      cliente.routes.js
      empresa.routes.js
    schemas/
      cliente.schema.js
      empresa.schema.js
    server.js

  .dockerignore
  .env
  .gitignore
  docker-compose.yml
  Dockerfile

## Parte 2.1 Listado de las dependencias utilizadas

Las dependencias que hemos utilizado son las siguientes:
  + body-parser
  + cors
  + dotenv
  + express
  + mongoose
  + morgan
  + redis

Es necesario definir que para empezar a desarrollar nuestro proyecto, en nuestra terminal
shell del mismo, ejecutanos el comando npm init -y, para inicializar el proyecto.

## Parte 2.1 Definiendo nuestro archivo .env

El archivo .env es un archivo de configuración que contiene las variables de entorno 
que utilizaremos en nuestro proyecto. En este archivo, debemos definir las variables 
que necesitamos para la conexión a nuestra base de datos y para la configuración de 
Redis.

### .env

MONGO_URI=mongodb://mongo01:27017/CASO01

MONGO_URI_SECONDARY=mongodb://mongo-secondary1:27017/CASO01

MONGO_URI_SECONDARY2=mongodb://mongo-secondary2:27017/CASO01

MONGO_URI_SECONDARY3=mongodb://mongo-secondary3:27017/CASO01

REDIS_HOST=redis01

REDIS_PORT=6379

PORT=3000

## Parte 2.3 Definiendo la configuración de conexión para nuestra Base de Datos

### db.config.js

const mongoose = require('mongoose'); 
const redis = require('redis'); 
require('dotenv').config(); 

// Realizando conexion a MongoDB
mongoose.connect(process.env. MONGO_URI).then(() => {

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

## Parte 2.4 Definiendo los modelos con mongoose

Como lo hemos mencionado antes, el proyecto se encuentra dividido en dos modelos principales
que a su vez cuentan con subdocumentos, a continuación mostramos el código de ambos
modelos definidos con la extensión de mongoose:

### cliente.schema.js

const mongoose = require('mongoose'); 

// Esquema de Cliente

const ClienteSchema = new mongoose. Schema({
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

### empresa.schema.js

const mongoose = require('mongoose'); 

// Esquema para la Empresa
const EmpresaSchema = new mongoose. Schema({
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

## Parte 2.5 Definiendo los controladores de los modelos

En un proyecto backend, los archivos de controlador (o controllers) 
son responsables de manejar la lógica de negocio y las 
operaciones relacionadas con las solicitudes HTTP que llegan al servidor.

### cliente.controller.js

const { Cliente } = require('../schemas/cliente.schema'); 

// ---- CRUD para Clientes ----

// Obtener todos los clientes
const obtenerClientes = async (req, res) => {

    try {
        const clientes = await Cliente.find();
        res.status(200).json(clientes);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener los clientes", error });
    }

}; 

// Obtener un cliente específico
const obtenerClientePorId = async (req, res) => {

    try {
        const cliente = await Cliente.findById(req.params.id);
        if (!cliente) {
            return res.status(404).json({ message: "Cliente no encontrado" });
        }
        res.status(200).json(cliente);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener el cliente", error });
    }

}; 

// Insertar un nuevo cliente
const insertarCliente = async (req, res) => {

    try {
        const nuevoCliente = new Cliente(req.body);
        const clienteGuardado = await nuevoCliente.save();
        res.status(201).json(clienteGuardado);
    } catch (error) {
        res.status(500).json({ message: "Error al insertar el cliente", error });
    }

}; 

const insertarClientes = async (req, res) => {

    try {
        const clientes = req.body; // Asegúrate de enviar un arreglo
        const resultado = await Cliente.insertMany(clientes);
        res.status(201).json({
            message: 'Clientes insertados correctamente',
            data: resultado,
        });
    } catch (error) {
        res.status(400).json({
            message: 'Error al insertar el cliente',
            error: error,
        });
    }

}; 

// Actualizar un cliente
const actualizarCliente = async (req, res) => {

    try {
        const clienteActualizado = await Cliente.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (!clienteActualizado) {
            return res.status(404).json({ message: "Cliente no encontrado" });
        }
        res.status(200).json(clienteActualizado);
    } catch (error) {
        res.status(500).json({ message: "Error al actualizar el cliente", error });
    }

}; 

// Eliminar un cliente
const eliminarCliente = async (req, res) => {

    try {
        const clienteEliminado = await Cliente.findByIdAndDelete(req.params.id);
        if (!clienteEliminado) {
            return res.status(404).json({ message: "Cliente no encontrado" });
        }
        res.status(200).json({ message: "Cliente eliminado correctamente" });
    } catch (error) {
        res.status(500).json({ message: "Error al eliminar el cliente", error });
    }

}; 

// ---- CRUD para Envíos (Subdocumentos) ----

// Obtener todos los envíos de un cliente
const obtenerEnvios = async (req, res) => {

    try {
        const cliente = await Cliente.findById(req.params.id);
        if (!cliente) {
            return res.status(404).json({ message: "Cliente no encontrado" });
        }
        res.status(200).json(cliente.envios);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener los envíos", error });
    }

}; 

// Obtener un envío específico
const obtenerEnvioPorId = async (req, res) => {

    try {
        const cliente = await Cliente.findById(req.params.clienteId);
        if (!cliente) {
            return res.status(404).json({ message: "Cliente no encontrado" });
        }
        const envio = cliente.envios.id(req.params.envioId);
        if (!envio) {
            return res.status(404).json({ message: "Envío no encontrado" });
        }
        res.status(200).json(envio);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener el envío", error });
    }

}; 

// Insertar un envío en un cliente
const insertarEnvio = async (req, res) => {

    try {
        const cliente = await Cliente.findById(req.params.clienteId);
        if (!cliente) {
            return res.status(404).json({ message: "Cliente no encontrado" });
        }
        cliente.envios.push(req.body);
        await cliente.save();
        res.status(201).json(cliente.envios);
    } catch (error) {
        res.status(500).json({ message: "Error al insertar el envío", error });
    }

}; 

// Actualizar un envío
const actualizarEnvio = async (req, res) => {

    try {
        const cliente = await Cliente.findById(req.params.clienteId);
        if (!cliente) {
            return res.status(404).json({ message: "Cliente no encontrado" });
        }
        const envio = cliente.envios.id(req.params.envioId);
        if (!envio) {
            return res.status(404).json({ message: "Envío no encontrado" });
        }
        Object.assign(envio, req.body);
        await cliente.save();
        res.status(200).json(envio);
    } catch (error) {
        res.status(500).json({ message: "Error al actualizar el envío", error });
    }

}; 

// Eliminar un envío
const eliminarEnvio = async (req, res) => {

    try {
        const cliente = await Cliente.findById(req.params.clienteId);
        if (!cliente) {
            return res.status(404).json({ message: "Cliente no encontrado" });
        }
        const envioEliminado = cliente.envios.id(req.params.envioId);
        if (!envioEliminado) {
            return res.status(404).json({ message: "Envío no encontrado" });
        }
        envioEliminado.remove();
        await cliente.save();
        res.status(200).json({ message: "Envío eliminado correctamente" });
    } catch (error) {
        res.status(500).json({ message: "Error al eliminar el envío", error });
    }

}; 

// Resolucion de querys

// Q2. Listar los envíos realizados en determinada oficina con estatus "transito"
const listarEnviosPorOficinaYTransito = async (req, res) => {

    const { oficinaId } = req.params;

    try {
        const envios = await Cliente.aggregate([
            { $unwind: "$envios" },
            {
                $match: {
                    "envios.origen": oficinaId,
                    "envios.estatus": "transito"
                }
            },
            { $project: { _id: 0, envio: "$envios" } }
        ]);
        res.status(200).json(envios);
    } catch (error) {
        res.status(500).json({ message: "Error al listar envíos", error });
    }

}; 

// Q3. Listar los envíos que utilizan un tipo específico de envío
const listarEnviosPorTipo = async (req, res) => {

    const { tipoEnvio } = req.params;

    try {
        const envios = await Cliente.aggregate([
            { $unwind: "$envios" },
            {
                $match: {
                    "envios.tipoEnvio": tipoEnvio
                }
            },
            { $project: { _id: 0, envio: "$envios" } }
        ]);
        res.status(200).json(envios);
    } catch (error) {
        res.status(500).json({ message: "Error al listar envíos por tipo", error });
    }

}; 

// Q4. Listar los envíos realizados por un cliente específico en todas las oficinas
const listarEnviosPorCliente = async (req, res) => {

    const { clienteId } = req.params;

    try {
        const cliente = await Cliente.findById(clienteId, { envios: 1 });
        if (!cliente) return res.status(404).json({ message: "Cliente no encontrado" });

        res.status(200).json(cliente.envios);
    } catch (error) {
        res.status(500).json({ message: "Error al listar envíos por cliente", error });
    }

}; 

// Q5. Listar los clientes que han realizado envíos en una determinada oficina
const listarClientesPorOficina = async (req, res) => {

    const { oficinaId } = req.params;

    try {
        const clientes = await Cliente.aggregate([
            { $unwind: "$envios" },
            {
                $match: {
                    "envios.origen": oficinaId
                }
            },
            { $group: { _id: "$_id", nombre: { $first: "$nombre" }, apellidos: { $first: "$apellidos" } } }
        ]);
        res.status(200).json(clientes);
    } catch (error) {
        res.status(500).json({ message: "Error al listar clientes", error });
    }

}; 

// Q6. Listar los envíos de todas las oficinas con estatus de "entregado"
const listarEnviosEntregados = async (req, res) => {

    try {
        const envios = await Cliente.aggregate([
            { $unwind: "$envios" },
            {
                $match: {
                    "envios.estatus": "entregado"
                }
            },
            { $project: { _id: 0, envio: "$envios" } }
        ]);
        res.status(200).json(envios);
    } catch (error) {
        res.status(500).json({ message: "Error al listar envíos entregados", error });
    }

}; 

// Q7. Listar los clientes y sus envíos que se han remitido por el servicio "terrestre" considerando todas las oficinas

const getClientesConEnviosTE1 = async (req, res) => {

    try {
        // Consultar clientes con envíos del tipo TE1
        /*const clientes = await Cliente.find(
            { "envios.tipoEnvio": "TE1" }, // Filtrar clientes que tengan al menos un envío con tipoEnvio "TE1"
            {
                _id: 1,
                nombre: 1,
                apellidos: 1,
                email: 1,
                envios: {
                    $filter: {
                        input: "$envios",
                        as: "envio",
                        cond: { $eq: ["$$envio.tipoEnvio", "TE1"] }
                    }
                }
            }
        );*/

        const clientes = await Cliente.aggregate([
            {
              $project: {
                _id: 1,
                nombre: 1,
                apellidos: 1,
                email: 1,
                envios: {
                  $filter: {
                    input: "$envios",
                    as: "envio",
                    cond: { $eq: ["$$envio.tipoEnvio", "TE1"] }
                  }
                }
              }
            },
            {
              $match: {
                "envios.0": { $exists: true } // Filtra clientes que tengan al menos un envío terrestre
              }
            }
          ]).toArray();
      
          res.status(200).json(clientes);

        // Verificar si no hay resultados
        if (!clientes.length) {
            return res.status(404).json({ mensaje: "No se encontraron clientes con envíos del tipo TE1." });
        }

        // Responder con los clientes filtrados
        res.status(200).json(clientes);
    } catch (error) {
        console.error("Error al obtener clientes:", error);
        res.status(500).json({ mensaje: "Error al obtener los clientes", error });
    }

}; 

// Q8. Listar los clientes y sus envíos que se han remitido por el servicio "express" considerando una oficina específica
const listarClientesPorEnviosExpressYOficina = async (req, res) => {

    const { oficinaId } = req.params;

    try {
        const clientes = await Cliente.aggregate([
            { $unwind: "$envios" },
            {
                $match: {
                    "envios.tipoEnvio": "TE3",
                    "envios.origen": oficinaId
                }
            },
            {
                $group: {
                    _id: "$_id",
                    nombre: { $first: "$nombre" },
                    apellidos: { $first: "$apellidos" },
                    envios: { $push: "$envios" }
                }
            }
        ]);
        res.status(200).json(clientes);
    } catch (error) {
        res.status(500).json({ message: "Error al listar clientes por envíos express y oficina", error });
    }

}; 

// Exportar las funciones
module.exports = {

    obtenerClientes,
    obtenerClientePorId,
    insertarCliente,
    insertarClientes,
    actualizarCliente,
    eliminarCliente,
    obtenerEnvios,
    obtenerEnvioPorId,
    insertarEnvio,
    actualizarEnvio,
    eliminarEnvio,
    listarEnviosPorOficinaYTransito,
    listarEnviosPorTipo,
    listarEnviosPorCliente,
    listarClientesPorOficina,
    listarEnviosEntregados,
    getClientesConEnviosTE1,
    listarClientesPorEnviosExpressYOficina

}; 

### empresa.controller.js

const { Empresa } = require('../schemas/empresa.schema'); 

//
// Operaciones para el Documento Completo de Empresa
//

// Obtener todas las empresas
const obtenerEmpresas = async (req, res) => {

    try {
        const empresas = await Empresa.find();
        res.json(empresas);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }

}; 

// Obtener una empresa específica
const obtenerEmpresaEspecifica = async (req, res) => {

    const { idEmpresa } = req.params.empresaId;
    try {
        const empresa = await Empresa.findById(idEmpresa);
        if (!empresa) return res.status(404).json({ error: "Empresa no encontrada" });
        res.json(empresa);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }

}; 

// Insertar una nueva empresa
const insertarEmpresa = async (req, res) => {

    const nuevaEmpresa = new Empresa(req.body);
    try {
        const empresaGuardada = await nuevaEmpresa.save();
        res.status(201).json(empresaGuardada);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }

}; 

// Actualizar una empresa
const actualizarEmpresa = async (req, res) => {

    const { idEmpresa } = req.params.empresaId;
    try {
        const empresaActualizada = await Empresa.findByIdAndUpdate(
            idEmpresa,
            req.body,
            { new: true }
        );
        if (!empresaActualizada) return res.status(404).json({ error: "Empresa no encontrada" });
        res.json(empresaActualizada);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }

}; 

// Eliminar una empresa
const eliminarEmpresa = async (req, res) => {

    const { idEmpresa } = req.params.empresaId;
    try {
        const empresaEliminada = await Empresa.findByIdAndDelete(idEmpresa);
        if (!empresaEliminada) return res.status(404).json({ error: "Empresa no encontrada" });
        res.json({ message: "Empresa eliminada correctamente" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }

}; 

//
// Operaciones para Subdocumentos de Oficinas
//

// Obtener todas las oficinas de una empresa
const obtenerOficinas = async (req, res) => {

    try {
        // Obtener el ID de la empresa desde los parámetros de la ruta
        const empresaId = req.params.id;

        // Consulta para obtener las oficinas de la empresa específica
        const empresa = await Empresa.findById(empresaId, { oficinas: 1, _id: 0 });

        if (!empresa) {
            return res.status(404).json({ message: "Empresa no encontrada" });
        }

        // Obtener la lista de oficinas de la empresa
        const listaOficinas = empresa.oficinas;

        res.status(200).json(listaOficinas);
    } catch (error) {
        res.status(500).json({ message: "Error al listar oficinas", error });
    }

}; 

// Obtener una oficina específica
const obtenerOficinaEspecifica = async (req, res) => {

    const idEmpresa = req.params.empresaId;
    const idOficina = req.params.oficinaId;
    try {
        const empresa = await Empresa.findById(idEmpresa);
        if (!empresa) return res.status(404).json({ error: "Empresa no encontrada" });
        const oficina = empresa.oficinas.id(idOficina);
        if (!oficina) return res.status(404).json({ error: "Oficina no encontrada" });

        res.json(oficina);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }

}; 

// Insertar una nueva oficina
const insertarOficina = async (req, res) => {

    const { idEmpresa } = req.params.empresaId;
    try {
        const empresa = await Empresa.findById(idEmpresa);
        if (!empresa) return res.status(404).json({ error: "Empresa no encontrada" });
        empresa.oficinas.push(req.body);
        await empresa.save();
        res.status(201).json(empresa.oficinas);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }

}; 

// Actualizar una oficina
const actualizarOficina = async (req, res) => {

    const idEmpresa = req.params.empresaId;
    const idOficina = req.params.oficinaId;
    try {
        const empresa = await Empresa.findById(idEmpresa);
        if (!empresa) return res.status(404).json({ error: "Empresa no encontrada" });
        const oficina = empresa.oficinas.id(idOficina);
        if (!oficina) return res.status(404).json({ error: "Oficina no encontrada" });

        Object.assign(oficina, req.body); 
        await empresa.save(); 

        res.json(oficina);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }

}; 

// Eliminar una oficina
const eliminarOficina = async (req, res) => {

    const idEmpresa = req.params.empresaId;
    const idOficina = req.params.oficinaId;
    try {
        const empresa = await Empresa.findById(idEmpresa);
        if (!empresa) return res.status(404).json({ error: "Empresa no encontrada" });
        const oficinaEliminada = empresa.oficinas.id(idOficina);
        if (!oficinaEliminada) return res.status(404).json({ error: "Oficina no encontrada" });

        oficinaEliminada.remove();
        await empresa.save();
        res.json({ message: "Oficina eliminada correctamente" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }

}; 

//
// Operaciones para Subdocumentos de Tipos de Envío
//

// Obtener todos los tipos de envío de una empresa
const obtenerTiposEnvio = async (req, res) => {

    const { idEmpresa } = req.params.empresaId;
    try {
        const empresa = await Empresa.findById(idEmpresa);
        if (!empresa) return res.status(404).json({ error: "Empresa no encontrada" });
        res.json(empresa.tiposEnvio);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }

}; 

// Obtener un tipo de envío específico
const obtenerTipoEnvioEspecifico = async (req, res) => {

    const idEmpresa = req.params.empresaId;
    const idTipoEnvio = req.params.tipoEnvioId;
    try {
        const empresa = await Empresa.findById(idEmpresa);
        if (!empresa) return res.status(404).json({ error: "Empresa no encontrada" });
        const tipoEnvio = empresa.tiposEnvio.id(idTipoEnvio);
        if (!tipoEnvio) return res.status(404).json({ error: "Tipo de envío no encontrado" });

        res.json(tipoEnvio);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }

}; 

// Insertar un nuevo tipo de envío
const insertarTipoEnvio = async (req, res) => {

    const { idEmpresa } = req.params.empresaId;
    try {
        const empresa = await Empresa.findById(idEmpresa);
        if (!empresa) return res.status(404).json({ error: "Empresa no encontrada" });
        empresa.tiposEnvio.push(req.body);
        await empresa.save();
        res.status(201).json(empresa.tiposEnvio);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }

}; 

// Actualizar un tipo de envío
const actualizarTipoEnvio = async (req, res) => {

    const idEmpresa = req.params.empresaId;
    const idTipoEnvio = req.params.tipoEnvioId;
    try {
        const empresa = await Empresa.findById(idEmpresa);
        if (!empresa) return res.status(404).json({ error: "Empresa no encontrada" });
        const tipoEnvio = empresa.tiposEnvio.id(idTipoEnvio);
        if (!tipoEnvio) return res.status(404).json({ error: "Tipo de envío no encontrado" });

        Object.assign(tipoEnvio, req.body); 
        await empresa.save(); 

        res.json(tipoEnvio);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }

}; 

// Eliminar un tipo de envío
const eliminarTipoEnvio = async (req, res) => {

    const idEmpresa = req.params.empresaId;
    const idTipoEnvio = req.params.tipoEnvioId;
    try {
        const empresa = await Empresa.findById(idEmpresa);
        if (!empresa) return res.status(404).json({ error: "Empresa no encontrada" });
        const tipoEnvioEliminado = empresa.tiposEnvio.id(idTipoEnvio);
        if (!tipoEnvioEliminado) return res.status(404).json({ error: "Tipo de envío no encontrado" });

        tipoEnvioEliminado.remove();
        await empresa.save();
        res.json({ message: "Tipo de envío eliminado correctamente" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }

}; 

// Q1. Listar todas las oficinas
const listarOficinas = async (req, res) => {

    try {
        // Obtener el ID de la empresa desde los parámetros de la ruta
        const empresaId = req.params.id;

        // Consulta para obtener las oficinas de la empresa específica
        const empresa = await Empresa.findById(empresaId, { oficinas: 1, _id: 0 });

        if (!empresa) {
            return res.status(404).json({ message: "Empresa no encontrada" });
        }

        // Obtener la lista de oficinas de la empresa
        const listaOficinas = empresa.oficinas;

        res.status(200).json(listaOficinas);
    } catch (error) {
        res.status(500).json({ message: "Error al listar oficinas", error });
    }

}; 

module.exports = {

    obtenerEmpresas,
    obtenerEmpresaEspecifica,
    insertarEmpresa,
    actualizarEmpresa,
    eliminarEmpresa,
    obtenerOficinas,
    obtenerOficinaEspecifica,
    insertarOficina,
    actualizarOficina,
    eliminarOficina,
    obtenerTiposEnvio,
    obtenerTipoEnvioEspecifico,
    insertarTipoEnvio,
    actualizarTipoEnvio,
    eliminarTipoEnvio,
    listarOficinas

}; 

## Parte 2.6 Definiendo las rutas del proyecto

En un proyecto backend, los archivos de rutas (o routes) son responsables 
de definir los endpoints de la API y asociar cada endpoint con una 
función de controlador específica. En otras palabras, las rutas 
actúan como un puente entre las solicitudes HTTP entrantes y la 
lógica de negocio que se encuentra en los controladores.

### cliente.routes.js

const express = require('express'); 
const router = express. Router(); 
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

### empresa.routes.js

const express = require('express'); 
const router = express. Router(); 
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

## Parte 2.7 Definiendo el middleware de logs con Redis

En un proyecto backend, el middleware de logs con Redis es 
una herramienta que se utiliza para registrar y almacenar 
información de solicitud y respuesta en una base de datos o 
almacenamiento externo. En este caso, el middleware de logs 
con Redis se utiliza para registrar y almacenar información 
de solicitud y respuesta en una base de datos Redis.

### logger.js

const redis = require('redis'); 

const client = redis.createClient({

    url: `redis://${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`

}); 

client.on('error', (err) => {

    console.error('Redis error de conexion: ', err);

}); 

client.connect().then(() => {

    console.log('Conectado a Redis');

}).catch((err) => {

    console.error('Error al conectar a Redis: ', err);

}); 

module.exports = (req, res, next) => {

    let originalSend = res.send;
    let responseBody;

    res.send = function (body) {
        responseBody = body;
        return originalSend.apply(this, arguments);
    }

    res.on('finish', async () => {
        if (!client.isOpen) {
            console.error('Redis client --> No se pudo conectar.');
            return;
        }
        const key = `${req.method}:${Date.now()}:${req.originalUrl}` ;
        const logEntry = JSON.stringify({
            time: new Date(),
            req: {
                method: req.method,
                url: req.originalUrl,
                headers: req.headers,
                body: req.body
            },
            res: {
                statusCode: res.statusCode,
                statusMessage: res.statusMessage,
                body: responseBody
            }
        });

        try {
            await client.set(key, logEntry, 'EX', 60 * 60 * 24);
        } catch (err) {
            console.error('Error al guardar en Redis: ', err);
        }
    });

    next();

}; 

## Parte 2.8 Definiendo nuestro servidor

En este archivo se realiza la configuración de nuestro servidor, 
utilizando la dependencia Express y distintas variables de entorno
de nuestro archivo .env.

### server.js

require('dotenv').config(); // Carga las variables de entorno desde el archivo .env
const express = require('express'); // Framework para construir aplicaciones web y APIs
const cors = require('cors'); // Middleware para permitir solicitudes de recursos cruzados
const morgan = require('morgan'); // Middleware para registrar solicitudes HTTP
const logger = require('./middleware/logger'); // Middleware personalizado para registrar solicitudes en Redis
const { mongoose, redisClient } = require('./config/db.config'); // Configuración de MongoDB y Redis

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
const PORT = process.env. PORT || 3000; 

// Iniciando el servidor
app.listen(PORT, () => {

    console.log( `🚀 Servidor escuchando en el puerto ${PORT}` );

}); 

## Parte 2.9 Definiendo nuestro docker-compose.yml

Un archivo docker-compose.yml se utiliza para definir y 
ejecutar aplicaciones Docker multi-contenedor. Docker 
Compose es una herramienta que permite definir y gestionar 
aplicaciones que constan de múltiples servicios en contenedores.

### docker-compose.yml

version: '3.8'

services:
  app01:

    build: .
    ports:

      - "3000:3000"
    depends_on:

      - mongo01
      - redis01
    environment:

      - MONGO_URI=mongodb://mongo01:27017/CASO01
      - REDIS_HOST=redis01
      - REDIS_PORT=6379
      - PORT=3000
    networks:

      - red01
    command: npm start

  mongo01:

    image: mongo:latest
    container_name: mongo01
    command: mongod --replSet replica01
    ports:

      - "27017:27017"
    healthcheck:
      test: >
        echo "try { rs.status() } catch (err) { 
          rs.initiate({
            _id: 'replica01', 
            members: [
              { _id: 0, host: 'mongo01:27017', priority: 1 },
              { _id: 1, host: 'mongo-secondary1:27017', priority: 0.5 },
              { _id: 2, host: 'mongo-secondary2:27017', priority: 0.5 },
              { _id: 3, host: 'mongo-secondary3:27017', priority: 0.5 }
            ]
          }) 
        }" | mongosh --port 27017 --quiet
      interval: 5s
      timeout: 30s
      start_period: 0s
      retries: 30
    depends_on:

      - mongo-secondary1
      - mongo-secondary2
      - mongo-secondary3
    networks:

      - red01

  mongo-secondary1:

    container_name: mongo-secondary1
    image: mongo:latest
    command: mongod --replSet replica01
    ports:

      - "27018:27017"
    networks:

      - red01

  mongo-secondary2:

    container_name: mongo-secondary2
    image: mongo:latest
    command: mongod --replSet replica01
    ports:

      - "27019:27017"
    networks:

      - red01

  mongo-secondary3:

    container_name: mongo-secondary3
    image: mongo:latest
    command: mongod --replSet replica01
    ports:

      - "27020:27017"
    networks:

      - red01

  redis01:

    image: redis/redis-stack:latest
    container_name: redis01
    ports:

      - "6379:6379"
      - "8001:8001"
    depends_on:

      - mongo01
    networks:

      - red01

networks:
  red01:

    driver: bridge

## Parte 2.10 Definiendo nuestro Dockerfile

Un Dockerfile es un archivo de texto que contiene una serie de 
instrucciones para construir una imagen de Docker.

### Dockerfile

FROM node

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "start"]

## Parte 2.11 Cambios realizados en package.json

Es necesario definir que dentro de nuestro archivo package.json, 
en la sección "scripts", se encuentren los comandos "start" y
"test" para poder ejecutar nuestra app en un contenedor Docker.

### package.json, seccion scripts

"scripts": {

    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "node src/server.js"

  }

## Parte 2.12 Definiendo extras, archivos .dockerignore y .gitignore

Los archivos .dockerignore y .gitignore son utilizados para excluir 
ciertos archivos y directorios de procesos específicos, como la 
construcción de imágenes Docker y el control de versiones con Git.

### .dockerignore

El archivo .dockerignore se utiliza para especificar qué archivos y 
directorios deben ser ignorados al construir una imagen Docker. 
Esto es útil para evitar incluir archivos innecesarios en la imagen, 
lo que puede reducir el tamaño de la imagen y mejorar los tiempos de construcción

node_modules
*.log
.git
.gitignore

### .gitignore

El archivo .gitignore se utiliza para indicar a Git qué 
archivos o directorios deben ser ignorados por el sistema de control 
de versiones. Esto es útil para evitar que archivos temporales, de 
configuración local, o generados automáticamente sean incluidos en el repositorio.

node_modules

## Parte 3 Definiendo como funciona el Replica Set

Un Replica Set en MongoDB es un grupo de instancias de MongoDB que mantienen el mismo conjunto 
de datos, proporcionando alta disponibilidad y redundancia. Un Replica Set consta de:

  + Primary Node: Es el nodo principal que recibe todas las operaciones de escritura. Solo hay un 
    nodo primario en un Replica Set a la vez.

  + Secondary Nodes: Estos nodos replican los datos del nodo primario. Pueden servir para 
    operaciones de lectura si se configura el cliente para permitir lecturas desde secundarios.

### Como hacemos funcionar nuestro Replica Set?

El Replica Set se configura en el archivo "docker-compose.yml" en la sección 
"services" de la siguiente manera:

mongo01:

    image: mongo:latest
    container_name: mongo01
    command: mongod --replSet replica01
    ports:

      - "27017:27017"
    healthcheck:
      test: >
        echo "try { rs.status() } catch (err) { 
          rs.initiate({
            _id: 'replica01', 
            members: [
              { _id: 0, host: 'mongo01:27017', priority: 1 },
              { _id: 1, host: 'mongo-secondary1:27017', priority: 0.5 },
              { _id: 2, host: 'mongo-secondary2:27017', priority: 0.5 },
              { _id: 3, host: 'mongo-secondary3:27017', priority: 0.5 }
            ]
          }) 
        }" | mongosh --port 27017 --quiet
      interval: 5s
      timeout: 30s
      start_period: 0s
      retries: 30
    depends_on:

      - mongo-secondary1
      - mongo-secondary2
      - mongo-secondary3
    networks:

      - red01

  mongo-secondary1:

    container_name: mongo-secondary1
    image: mongo:latest
    command: mongod --replSet replica01
    ports:

      - "27018:27017"
    networks:

      - red01

  mongo-secondary2:

    container_name: mongo-secondary2
    image: mongo:latest
    command: mongod --replSet replica01
    ports:

      - "27019:27017"
    networks:

      - red01

  mongo-secondary3:

    container_name: mongo-secondary3
    image: mongo:latest
    command: mongod --replSet replica01
    ports:

      - "27020:27017"
    networks:

      - red01

### Explicando el codigo

Configuración de los Servicios
  - mongo01:
      - Este contenedor está configurado para ser el nodo primario del Replica Set.
      - Utiliza la imagen mongo:latest y se inicia con el comando mongod --replSet 
        replica01, lo que indica que este nodo es parte del Replica Set llamado replica01.
      - Expone el puerto 27017 para permitir conexiones externas.
      - Incluye un healthcheck que ejecuta un script en mongosh para verificar el estado 
        del Replica Set. Si el Replica Set no está iniciado, el script lo inicializa con la 
        configuración especificada.
  - mongo-secondary1, mongo-secondary2, mongo-secondary3:
      - Estos contenedores son los nodos secundarios del Replica Set.
      - Cada uno utiliza la misma imagen mongo:latest y se inicia con el mismo comando 
        mongod --replSet replica01.
      - Cada nodo expone un puerto diferente (27018, 27019, 27020) para evitar conflictos 
        de puertos en el host.
      - Todos están conectados a la misma red red01 para permitir la comunicación entre ellos.
Configuración del Replica Set
  - Inicialización del Replica Set:
      - El healthcheck del nodo mongo01 intenta ejecutar rs.status() para verificar si 
        el Replica Set ya está configurado. Si no lo está, ejecuta rs.initiate() para inicializarlo.
      - La configuración del Replica Set incluye cuatro miembros:
        - mongo01 como el nodo primario con prioridad 1.
        - mongo-secondary1, mongo-secondary2, y mongo-secondary3 como nodos secundarios, cada uno con una prioridad de 0.5.