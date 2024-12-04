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
