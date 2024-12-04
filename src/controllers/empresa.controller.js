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

