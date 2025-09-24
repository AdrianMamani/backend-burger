const pool = require('../config/db');

const categoriasController = {};

// Obtener todas las categorías
categoriasController.obtenerCategorias = async (req, res) => {
    try {
        const [rows] = await pool.query('CALL sp_obtener_categorias()');
        res.json(rows[0]);
    } catch (err) {
        res.status(500).json({ error: 'Error al obtener las categorías' });
    }
};

// Obtener categoría por ID
categoriasController.obtenerCategoriaPorId = async (req, res) => {
    try {
        const { id } = req.params;
        const [rows] = await pool.query('CALL sp_obtener_categoria_por_id(?)', [id]);
        if (rows[0].length > 0) {
            res.json(rows[0][0]);
        } else {
            res.status(404).json({ mensaje: 'Categoría no encontrada' });
        }
    } catch (err) {
        res.status(500).json({ error: 'Error al obtener la categoría' });
    }
};

// Crear nueva categoría
categoriasController.crearCategoria = async (req, res) => {
    try {
        const { nom_cat } = req.body;
        await pool.query('CALL sp_insertar_categoria(?)', [nom_cat]);
        res.status(201).json({ mensaje: 'Categoría creada con éxito' });
    } catch (err) {
        res.status(500).json({ error: 'Error al crear la categoría' });
    }
};

// Actualizar categoría
categoriasController.actualizarCategoria = async (req, res) => {
    try {
        const { id } = req.params;
        const { nom_cat } = req.body;
        await pool.query('CALL sp_actualizar_categoria(?, ?)', [id, nom_cat]);
        res.json({ mensaje: 'Categoría actualizada con éxito' });
    } catch (err) {
        res.status(500).json({ error: 'Error al actualizar la categoría' });
    }
};

// Eliminar categoría
categoriasController.eliminarCategoria = async (req, res) => {
    try {
        const { id } = req.params;
        await pool.query('CALL sp_eliminar_categoria(?)', [id]);
        res.json({ mensaje: 'Categoría eliminada con éxito' });
    } catch (err) {
        res.status(500).json({ error: 'Error al eliminar la categoría' });
    }
};

module.exports = categoriasController;
