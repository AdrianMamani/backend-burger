const pool = require('../config/db');

const distritoController = {};

// Obtener todos los distritos
distritoController.obtenerDistritos = async (req, res) => {
    try {
        const [rows] = await pool.query('CALL sp_listar_distritos()');
        res.json(rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Obtener un distrito por ID
distritoController.obtenerDistritoPorId = async (req, res) => {
    try {
        const { id } = req.params;
        const [rows] = await pool.query('CALL sp_buscar_distrito(?)', [id]);
        if (rows[0].length > 0) {
            res.json(rows[0][0]);
        } else {
            res.status(404).json({ mensaje: 'Distrito no encontrado' });
        }
    } catch (err) {
        res.status(500).json({ error: 'Error al obtener el distrito' });
    }
};

// Crear un nuevo distrito
distritoController.crearDistrito = async (req, res) => {
    try {
        const { nombre, id_provincia } = req.body;
        await pool.query('CALL sp_agregar_distrito(?, ?)', [nombre, id_provincia]);
        res.status(201).json({ mensaje: 'Distrito creado con éxito' });
    } catch (err) {
        res.status(500).json({ error: 'Error al crear el distrito' });
    }
};

// Actualizar un distrito
distritoController.actualizarDistrito = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre, id_provincia } = req.body;
        await pool.query('CALL sp_editar_distrito(?, ?, ?)', [id, nombre, id_provincia]);
        res.json({ mensaje: 'Distrito actualizado con éxito' });
    } catch (err) {
        res.status(500).json({ error: 'Error al actualizar el distrito' });
    }
};

// Eliminar un distrito
distritoController.eliminarDistrito = async (req, res) => {
    try {
        const { id } = req.params;
        await pool.query('CALL sp_eliminar_distrito(?)', [id]);
        res.json({ mensaje: 'Distrito eliminado con éxito' });
    } catch (err) {
        res.status(500).json({ error: 'Error al eliminar el distrito' });
    }
};

// web
// Obtener distritos por provincia
distritoController.obtenerDistritosPorProvincia = async (req, res) => {
    try {
        const { id_provincia } = req.query; // /api/distritos?provincia=5
        const [rows] = await pool.query('CALL sp_listar_distritos_por_provincia(?)', [id_provincia]);
        res.json(rows[0]);
    } catch (err) {
        res.status(500).json({ error: 'Error al obtener distritos por provincia' });
    }
};

module.exports = distritoController;
