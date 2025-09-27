const pool = require('../config/db');

const departamentoController = {};

// Obtener todos los departamentos
departamentoController.obtenerDepartamentos = async (req, res) => {
    try {
        const [rows] = await pool.query('CALL sp_listar_departamentos()');
        res.json(rows[0]);
    } catch (err) {
        res.status(500).json({ error: 'Error al obtener los departamentos' });
    }
};

// Obtener un departamento por ID
departamentoController.obtenerDepartamentoPorId = async (req, res) => {
    try {
        const { id } = req.params;
        const [rows] = await pool.query('CALL sp_buscar_departamento(?)', [id]);
        if (rows[0].length > 0) {
            res.json(rows[0][0]);
        } else {
            res.status(404).json({ mensaje: 'Departamento no encontrado' });
        }
    } catch (err) {
        res.status(500).json({ error: 'Error al obtener el departamento' });
    }
};

// Crear un nuevo departamento
departamentoController.crearDepartamento = async (req, res) => {
    try {
        const { nombre } = req.body;
        await pool.query('CALL sp_agregar_departamento(?)', [nombre]);
        res.status(201).json({ mensaje: 'Departamento creado con éxito' });
    } catch (err) {
        res.status(500).json({ error: 'Error al crear el departamento' });
    }
};

// Actualizar un departamento
departamentoController.actualizarDepartamento = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre } = req.body;
        await pool.query('CALL sp_editar_departamento(?, ?)', [id, nombre]);
        res.json({ mensaje: 'Departamento actualizado con éxito' });
    } catch (err) {
        res.status(500).json({ error: 'Error al actualizar el departamento' });
    }
};

// Eliminar un departamento
departamentoController.eliminarDepartamento = async (req, res) => {
    try {
        const { id } = req.params;
        await pool.query('CALL sp_eliminar_departamento(?)', [id]);
        res.json({ mensaje: 'Departamento eliminado con éxito' });
    } catch (err) {
        res.status(500).json({ error: 'Error al eliminar el departamento' });
    }
};

module.exports = departamentoController;
