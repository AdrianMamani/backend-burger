const pool = require('../config/db');

const marcasController = {};

// Obtener todas las marcas
marcasController.obtenerMarcas = async (req, res) => {
    try {
        const [rows] = await pool.query('CALL sp_obtener_marcas()');
        res.json(rows[0]);
    } catch (err) {
        res.status(500).json({ error: 'Error al obtener las marcas' });
    }
};

// Obtener una marca por ID
marcasController.obtenerMarcaPorId = async (req, res) => {
    try {
        const { id } = req.params;
        const [rows] = await pool.query('CALL sp_obtener_marca_por_id(?)', [id]);
        if (rows[0].length > 0) {
            res.json(rows[0][0]);
        } else {
            res.status(404).json({ mensaje: 'Marca no encontrada' });
        }
    } catch (err) {
        res.status(500).json({ error: 'Error al obtener la marca' });
    }
};

// Crear una nueva marca
marcasController.crearMarca = async (req, res) => {
    try {
        const { nom_marca } = req.body;
        await pool.query('CALL sp_insertar_marca(?)', [nom_marca]);
        res.status(201).json({ mensaje: 'Marca creada con éxito' });
    } catch (err) {
        res.status(500).json({ error: 'Error al crear la marca' });
    }
};

// Actualizar una marca
marcasController.actualizarMarca = async (req, res) => {
    try {
        const { id } = req.params;
        const { nom_marca } = req.body;
        await pool.query('CALL sp_actualizar_marca(?, ?)', [id, nom_marca]);
        res.json({ mensaje: 'Marca actualizada con éxito' });
    } catch (err) {
        res.status(500).json({ error: 'Error al actualizar la marca' });
    }
};

// Eliminar una marca
marcasController.eliminarMarca = async (req, res) => {
    try {
        const { id } = req.params;
        await pool.query('CALL sp_eliminar_marca(?)', [id]);
        res.json({ mensaje: 'Marca eliminada con éxito' });
    } catch (err) {
        res.status(500).json({ error: 'Error al eliminar la marca' });
    }
};

module.exports = marcasController;
