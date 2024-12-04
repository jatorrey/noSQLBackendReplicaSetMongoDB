// Conectandonos a la base de datos
use('pruebadb');

// Q0. Crear el escenario de datos con la correspondiente integridad 
//     referencial en un único archivo. La ejecución de dicho archivo 
//     debe insertar la totalidad de datos en las correspondientes instancias.

// Desarrollo de la insercion de datos a las distintas colecciones
// Insertar datos en la colección "oficinas"
db.oficinas.insertMany([
    {
        _id: 1,
        nombre: "Oficina CDMX",
        direccion: {
            calle: "Insurgentes",
            numero: 123,
            ciudad: "Ciudad de México",
            codigoPostal: "01000"
        },
        telefono: "555-123-4567",
        email: "cdmx@paqueteria.com"
    },
    {
        _id: 2,
        nombre: "Oficina Guadalajara",
        direccion: {
            calle: "Av. Vallarta",
            numero: 456,
            ciudad: "Guadalajara",
            codigoPostal: "44100"
        },
        telefono: "333-987-6543",
        email: "gdl@paqueteria.com"
    },
    {
        _id: 3,
        nombre: "Oficina Monterrey",
        direccion: {
            calle: "Constitución",
            numero: 789,
            ciudad: "Monterrey",
            codigoPostal: "64000"
        },
        telefono: "818-765-4321",
        email: "mty@paqueteria.com"
    },
    {
        _id: 4,
        nombre: "Oficina Puebla",
        direccion: {
            calle: "Reforma",
            numero: 321,
            ciudad: "Puebla",
            codigoPostal: "72000"
        },
        telefono: "222-456-7890",
        email: "puebla@paqueteria.com"
    },
    {
        _id: 5,
        nombre: "Oficina Tijuana",
        direccion: {
            calle: "Benito Juárez",
            numero: 567,
            ciudad: "Tijuana",
            codigoPostal: "22000"
        },
        telefono: "664-321-0987",
        email: "tijuana@paqueteria.com"
    }
]);

// Insertar datos en la colección "clientes"
db.clientes.insertMany([
    {
        curp: "CURP123456HDFABC01",
        nombre: "Celeste",
        apellidos: "Vargas García",
        email: "celeste.vargas@gmail.com"
    },
    {
        curp: "CURP789012HDFXYZ02",
        nombre: "María",
        apellidos: "López Hernández",
        email: "maria.lopez@gmail.com"
    },
    {
        curp: "CURP345678HDFLMN03",
        nombre: "Carlos",
        apellidos: "Ramírez Torres",
        email: "carlos.ramirez@gmail.com"
    },
    {
        curp: "CURP901234HDFOPQ04",
        nombre: "Ana",
        apellidos: "Martínez Velázquez",
        email: "ana.martinez@gmail.com"
    },
    {
        curp: "CURP567890HDFRST05",
        nombre: "Luis",
        apellidos: "González Fernández",
        email: "luis.gonzalez@gmail.com"
    }
]);

// Insertar datos en la colección "tiposEnvio"
db.tiposEnvio.insertMany([
    {
        _id: 1,
        descripcion: "terrestre",
        precioPorKm: 5.0,
        tiempoEstimado: "5-7 días"
    },
    {
        _id: 2,
        descripcion: "aéreo",
        precioPorKm: 10.0,
        tiempoEstimado: "2-3 días"
    },
    {
        _id: 3,
        descripcion: "express",
        precioPorKm: 20.0,
        tiempoEstimado: "1 día"
    },
    {
        _id: 4,
        descripcion: "económico",
        precioPorKm: 3.0,
        tiempoEstimado: "7-10 días"
    },
    {
        _id: 5,
        descripcion: "premium",
        precioPorKm: 15.0,
        tiempoEstimado: "1-2 días"
    }
]);

// Insertar datos en la colección "envios"
db.envios.insertMany([
    {
        _id: 1,
        fechaEnvio: new Date("2024-11-01"),
        origen: 1,
        destino: 2,
        tipoEnvio: 3,
        cliente: "CURP123456HDFABC01",
        peso: 10.5,
        dimensiones: {
            alto: 50,
            ancho: 30,
            largo: 20
        },
        costoTotal: 1000.0,
        estatus: "pendiente"
    },
    {
        _id: 2,
        fechaEnvio: new Date("2024-11-10"),
        origen: 2,
        destino: 3,
        tipoEnvio: 2,
        cliente: "CURP789012HDFXYZ02",
        peso: 5.2,
        dimensiones: {
            alto: 40,
            ancho: 20,
            largo: 15
        },
        costoTotal: 500.0,
        estatus: "tránsito"
    },
    {
        _id: 3,
        fechaEnvio: new Date("2024-11-15"),
        origen: 3,
        destino: 4,
        tipoEnvio: 1,
        cliente: "CURP345678HDFLMN03",
        peso: 15.3,
        dimensiones: {
            alto: 60,
            ancho: 40,
            largo: 30
        },
        costoTotal: 750.0,
        estatus: "pendiente"
    },
    {
        _id: 4,
        fechaEnvio: new Date("2024-11-18"),
        origen: 4,
        destino: 5,
        tipoEnvio: 4,
        cliente: "CURP901234HDFOPQ04",
        peso: 8.0,
        dimensiones: {
            alto: 45,
            ancho: 25,
            largo: 20
        },
        costoTotal: 400.0,
        estatus: "pendiente"
    },
    {
        _id: 5,
        fechaEnvio: new Date("2024-11-20"),
        origen: 5,
        destino: 1,
        tipoEnvio: 5,
        cliente: "CURP567890HDFRST05",
        peso: 12.0,
        dimensiones: {
            alto: 55,
            ancho: 35,
            largo: 25
        },
        costoTotal: 1200.0,
        estatus: "entregado"
    }
]);

//--------------------------------------------------------------------------------------

// Q1. Listar los datos de todas las oficinas
db.oficinas.find();

//--------------------------------------------------------------------------------------

// Q2. Listar los envios realizados en determinada oficina con estatus "tránsito"
db.envios.find({ origen: 2, estatus: "tránsito" });

//--------------------------------------------------------------------------------------

// Q3. Listar los envios que utilizan un tipo especifico de envio
db.envios.find({ tipoEnvio: 3 });

//--------------------------------------------------------------------------------------

// Q4. Listar los envios realizados por un cliente especifico en todas las oficinas
db.envios.find({ cliente: "CURP901234HDFOPQ04" });

//--------------------------------------------------------------------------------------

// Q5. Listar los clientes que han realizado envios en una determinada oficina
// Para el desarrollo de esta Query vamos a estructurar un documento de tipo Master-Detail
// Donde la oficina es el Master y el cliente es el Detail

// Parámetro: ID de la oficina para filtrar
const oficinaIdQ5 = 1; // Cambiar este valor según sea necesario

// Consulta para estructurar Master-Detail
const resultadoQ5 = db.envios.aggregate([
  // Filtrar envíos donde la oficina sea el origen o destino
  {
    $match: {
      $or: [
        { origen: oficinaIdQ5 },
        { destino: oficinaIdQ5 }
      ]
    }
  },
  // Unir con la colección "clientes" para obtener los datos del cliente
  {
    $lookup: {
      from: "clientes",
      localField: "cliente", // Campo de referencia en "envios"
      foreignField: "curp", // Campo clave en "clientes"
      as: "clienteDatos"
    }
  },
  // Unir con la colección "oficinas" para obtener los datos de la oficina
  {
    $lookup: {
      from: "oficinas",
      localField: "origen",
      foreignField: "_id",
      as: "oficinaOrigen"
    }
  },
  {
    $lookup: {
      from: "oficinas",
      localField: "destino",
      foreignField: "_id",
      as: "oficinaDestino"
    }
  },
  // Proyectar un documento Master-Detail
  {
    $group: {
      _id: "$origen", // Agrupar por la oficina de origen
      oficina: { $first: "$oficinaOrigen" },
      clientes: { $addToSet: "$clienteDatos" } // Detalles de los clientes
    }
  },
  // Limpiar estructuras anidadas
  {
    $project: {
      oficina: { $arrayElemAt: ["$oficina", 0] }, // Convertir array de oficina a objeto
      clientes: { $arrayElemAt: ["$clientes", 0] } // Convertir array de clientes a objeto
    }
  }
]);

// Mostrar resultado
resultadoQ5.forEach(doc => printjson(doc));

//--------------------------------------------------------------------------------------

// Q6. Listar los envios de todas las oficinas con estatus de entregado
db.envios.find({ estatus: "entregado" });

//--------------------------------------------------------------------------------------

// Q7. Listar los clientes y sus envios que se han remitido por el servicio
//     terrestre considerando todas las oficinas
// De igual manera este Query es resuelto por medio de un documento Master-Detail
// donde cada cliente es el Master y sus envios relacionados con el servicio
// terrestre son los Details.

// Consulta para estructurar Master-Detail de clientes y sus envíos terrestres
const resultadoQ7 = db.envios.aggregate([
    // Filtrar envíos realizados con el servicio "terrestre"
    {
      $match: {
        tipoEnvio: 1 // ID del servicio terrestre
      }
    },
    // Unir con la colección "clientes" para obtener datos del cliente
    {
      $lookup: {
        from: "clientes",
        localField: "cliente", // Campo de referencia en "envios"
        foreignField: "curp", // Campo clave en "clientes"
        as: "clienteDatos"
      }
    },
    // Unir con la colección "oficinas" para obtener las oficinas de origen y destino
    {
      $lookup: {
        from: "oficinas",
        localField: "origen",
        foreignField: "_id",
        as: "oficinaOrigen"
      }
    },
    {
      $lookup: {
        from: "oficinas",
        localField: "destino",
        foreignField: "_id",
        as: "oficinaDestino"
      }
    },
    // Estructurar Master-Detail agrupando por cliente
    {
      $group: {
        _id: "$cliente", // Agrupar por cliente
        cliente: { $first: { $arrayElemAt: ["$clienteDatos", 0] } }, // Detalles del cliente
        envios: {
          $push: {
            fechaEnvio: "$fechaEnvio",
            oficinaOrigen: { $arrayElemAt: ["$oficinaOrigen", 0] },
            oficinaDestino: { $arrayElemAt: ["$oficinaDestino", 0] },
            peso: "$peso",
            dimensiones: "$dimensiones",
            costoTotal: "$costoTotal",
            estatus: "$estatus"
          }
        }
      }
    },
    // Proyección final para limpiar el resultado
    {
      $project: {
        cliente: {
          curp: "$cliente.curp",
          nombre: "$cliente.nombre",
          apellidos: "$cliente.apellidos",
          email: "$cliente.email"
        },
        envios: 1 // Mantener los envíos como detalles
      }
    }
  ]);
  
  // Mostrar resultado
  resultadoQ7.forEach(doc => printjson(doc));

//--------------------------------------------------------------------------------------

// Q8. Listar los clientes y sus envios que se han remitido por el
//     servicio express considerando una oficina en especifico
// De igual manera este Query es resuelto por medio de un documento Master-Detail
// donde cada cliente es el Master y sus envios relacionados con el servicio
// express son los Details.

// Parámetros para filtrar
const oficinaIdQ8 = 2; // Cambiar según la oficina deseada
const tipoEnvioExpressIdQ8 = 3; // ID del servicio express

// Consulta para estructurar Master-Detail de clientes y sus envíos express
const resultadoQ8 = db.envios.aggregate([
  // Filtrar envíos por tipo de envío express y la oficina específica
  {
    $match: {
      tipoEnvio: tipoEnvioExpressIdQ8, // Filtrar por el servicio express
      $or: [
        { origen: oficinaIdQ8 }, // Si la oficina es el origen
        { destino: oficinaIdQ8 } // Si la oficina es el destino
      ]
    }
  },
  // Unir con la colección "clientes" para obtener los datos del cliente
  {
    $lookup: {
      from: "clientes",
      localField: "cliente", // Referencia al cliente en "envios"
      foreignField: "curp", // Clave en "clientes"
      as: "clienteDatos"
    }
  },
  // Unir con la colección "oficinas" para incluir las oficinas de origen y destino
  {
    $lookup: {
      from: "oficinas",
      localField: "origen",
      foreignField: "_id",
      as: "oficinaOrigen"
    }
  },
  {
    $lookup: {
      from: "oficinas",
      localField: "destino",
      foreignField: "_id",
      as: "oficinaDestino"
    }
  },
  // Estructurar Master-Detail agrupando por cliente
  {
    $group: {
      _id: "$cliente", // Agrupar por cliente
      cliente: { $first: { $arrayElemAt: ["$clienteDatos", 0] } }, // Información del cliente
      envios: {
        $push: {
          fechaEnvio: "$fechaEnvio",
          oficinaOrigen: { $arrayElemAt: ["$oficinaOrigen", 0] },
          oficinaDestino: { $arrayElemAt: ["$oficinaDestino", 0] },
          peso: "$peso",
          dimensiones: "$dimensiones",
          costoTotal: "$costoTotal",
          estatus: "$estatus"
        }
      }
    }
  },
  // Proyección final para limpiar la estructura del resultado
  {
    $project: {
      cliente: {
        curp: "$cliente.curp",
        nombre: "$cliente.nombre",
        apellidos: "$cliente.apellidos",
        email: "$cliente.email"
      },
      envios: 1 // Mantener los envíos como detalles
    }
  }
]);

// Mostrar resultado
resultadoQ8.forEach(doc => printjson(doc));

//--------------------------------------------------------------------------------------
