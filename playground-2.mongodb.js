// Eligiendo la db que vamos a usar
use('CASO01');

// Q0. Crear el escenario de datos con la correspondiente integridad 
//     referencial en un único archivo. La ejecución de dicho archivo 
//     debe insertar la totalidad de datos en las correspondientes instancias.

// Insertar en empresaEnvios
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

// Insertar en clientesEmpresa
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

//--------------------------------------------------------------------------------------

// Q1. Listar los datos de todas las oficinas
db.empresa.find({}, { oficinas: 1 })

//--------------------------------------------------------------------------------------

// Q2. Listar los envios realizados en determinada oficina con estatus "tránsito"
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

//--------------------------------------------------------------------------------------

// Q3. Listar los envios que utilizan un tipo especifico de envio
db.clientes.find({ envios: { $elemMatch: { tipoEnvio: "TE1" } } }, { envios: { $elemMatch: { tipoEnvio: "TE1" } } })
//--------------------------------------------------------------------------------------

// Q4. Listar los envios realizados por un cliente especifico en todas las oficinas
db.clientes.find({ _id: "CURP123456HDFABC01" }, { envios: 1 })

//--------------------------------------------------------------------------------------

// Q5. Listar los clientes que han realizado envios en una determinada oficina
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

//--------------------------------------------------------------------------------------

// Q6. Listar los clientes que han realizado envios en todas las oficinas con estatus de entregado
db.clientes.find({ envios: { $elemMatch: { estatus: "entregado" } } }, { envios: 1 })

//--------------------------------------------------------------------------------------

// Q7. Listar los clientes y sus envios que se han remitido por el servicio
//     terrestre considerando todas las oficinas
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


//--------------------------------------------------------------------------------------

// Q8. Listar los clientes y sus envios que se han remitido por el servicio
//     express considerando una oficina en especifico
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


//--------------------------------------------------------------------------------------