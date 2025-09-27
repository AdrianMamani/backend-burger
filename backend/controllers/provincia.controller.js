const pool = require('../config/db');

const provinciaController = {};

// Obtener todas las provincias
provinciaController.obtenerProvincias = async (req, res) => {
    try {
        const [rows] = await pool.query('CALL sp_listar_provincias()');
        res.json(rows[0]);
    } catch (err) {
        res.status(500).json({ error: 'Error al obtener las provincias' });
    }
};

// Obtener una provincia por ID
provinciaController.obtenerProvinciaPorId = async (req, res) => {
    try {
        const { id } = req.params;
        const [rows] = await pool.query('CALL sp_buscar_provincia(?)', [id]);
        if (rows[0].length > 0) {
            res.json(rows[0][0]);
        } else {
            res.status(404).json({ mensaje: 'Provincia no encontrada' });
        }
    } catch (err) {
        res.status(500).json({ error: 'Error al obtener la provincia' });
    }
};

// Crear una nueva provincia
provinciaController.crearProvincia = async (req, res) => {
    try {
        const { nombre, id_departamento } = req.body;
        await pool.query('CALL sp_agregar_provincia(?, ?)', [nombre, id_departamento]);
        res.status(201).json({ mensaje: 'Provincia creada con éxito' });
    } catch (err) {
        res.status(500).json({ error: 'Error al crear la provincia' });
    }
};

// Actualizar una provincia
provinciaController.actualizarProvincia = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre, id_departamento } = req.body;
        await pool.query('CALL sp_editar_provincia(?, ?, ?)', [id, nombre, id_departamento]);
        res.json({ mensaje: 'Provincia actualizada con éxito' });
    } catch (err) {
        res.status(500).json({ error: 'Error al actualizar la provincia' });
    }
};

// Eliminar una provincia
provinciaController.eliminarProvincia = async (req, res) => {
    try {
        const { id } = req.params;
        await pool.query('CALL sp_eliminar_provincia(?)', [id]);
        res.json({ mensaje: 'Provincia eliminada con éxito' });
    } catch (err) {
        res.status(500).json({ error: 'Error al eliminar la provincia' });
    }
};

// web
provinciaController.obtenerProvinciasPorDepartamento = async (req, res) => {
    try {
        const { id_departamento } = req.query; // /api/provincia/por-departamento?id_departamento=1
        if (!id_departamento) {
            return res.status(400).json({ error: 'Debe indicar el id_departamento' });
        }

        const [rows] = await pool.query('CALL sp_listar_provincias_por_departamento(?)', [id_departamento]);
        res.json(rows[0]);
    } catch (err) {
        console.error('Error al obtener provincias por departamento:', err);
        res.status(500).json({ error: 'Error al obtener provincias por departamento' });
    }
};


module.exports = provinciaController;
