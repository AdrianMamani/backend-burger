const pool = require('../config/db');

const controlador = {};

// Get all units
controlador.obtenerUnidades = async (req, res) => {
    try {
        const [rows] = await pool.query('CALL sp_obtener_unidades()');
        res.json(rows[0]);
    } catch (err) {
        res.status(500).json({ error: 'Error al obtener las unidades' });
    }
};

// Get a single unit by ID
controlador.obtenerUnidadPorId = async (req, res) => {
    try {
        const { id } = req.params;
        const [rows] = await pool.query('CALL sp_obtener_unidad_por_id(?)', [id]);
        if (rows[0].length > 0) {
            res.json(rows[0][0]);
        } else {
            res.status(404).json({ mensaje: 'Unidad no encontrada' });
        }
    } catch (err) {
        res.status(500).json({ error: 'Error al obtener la unidad' });
    }
};

// Create a new unit
controlador.crearUnidad = async (req, res) => {
    try {
        const { nom_uni } = req.body;
        await pool.query('CALL sp_insertar_unidad(?)', [ nom_uni]);
        res.status(201).json({ mensaje: 'Unidad creada con éxito' });
    } catch (err) {
        res.status(500).json({ error: 'Error al crear la unidad' });
    }
};

// Update an existing unit
controlador.actualizarUnidad = async (req, res) => {
    try {
        const { id } = req.params;
        const { nom_uni } = req.body;
        await pool.query('CALL sp_actualizar_unidad(?, ?)', [id, nom_uni]);
        res.json({ mensaje: 'Unidad actualizada con éxito' });
    } catch (err) {
        res.status(500).json({ error: 'Error al actualizar la unidad' });
    }
};

// Delete a unit
controlador.eliminarUnidad = async (req, res) => {
    try {
        const { id } = req.params;
        await pool.query('CALL sp_eliminar_unidad(?)', [id]);
        res.json({ mensaje: 'Unidad eliminada con éxito' });
    } catch (err) {
        res.status(500).json({ error: 'Error al eliminar la unidad' });
    }
};

module.exports = controlador;