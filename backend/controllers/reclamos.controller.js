const pool = require('../config/db');

const reclamoController = {};

// 📌 Listar todos los reclamos
reclamoController.obtenerReclamos = async (req, res) => {
    try {
        const [rows] = await pool.query('CALL sp_listar_reclamos()');
        res.json(rows[0]);
    } catch (err) {
        res.status(500).json({ error: 'Error al obtener los reclamos' });
    }
};

// 📌 Obtener reclamo por ID
reclamoController.obtenerReclamoPorId = async (req, res) => {
    try {
        const { id } = req.params;
        const [rows] = await pool.query('CALL sp_obtener_reclamo_por_id(?)', [id]);
        if (rows[0].length > 0) {
            res.json(rows[0][0]);
        } else {
            res.status(404).json({ mensaje: 'Reclamo no encontrado' });
        }
    } catch (err) {
        res.status(500).json({ error: 'Error al obtener el reclamo' });
    }
};

// 📌 Crear reclamo
reclamoController.crearReclamo = async (req, res) => {
    try {
        const { descripcion, fecha, estado, id_cliente } = req.body;

        const [rows] = await pool.query(
            'CALL sp_agregar_reclamo(?, ?, ?, ?)',
            [descripcion, fecha, estado || 'Pendiente', id_cliente]
        );

        res.status(201).json({
            mensaje: 'Reclamo creado con éxito',
            data: rows[0][0] // Devuelve {id_reclamo}
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error al crear el reclamo' });
    }
};

// 📌 Actualizar reclamo
reclamoController.actualizarReclamo = async (req, res) => {
    try {
        const { id } = req.params;
        const { descripcion, fecha, estado, id_cliente } = req.body;
        await pool.query('CALL sp_actualizar_reclamo(?, ?, ?, ?, ?)', [
            id,
            descripcion,
            fecha,
            estado || null,
            id_cliente
        ]);
        res.json({ mensaje: 'Reclamo actualizado con éxito' });
    } catch (err) {
        res.status(500).json({ error: 'Error al actualizar el reclamo' });
    }
};

// 📌 Eliminar reclamo
reclamoController.eliminarReclamo = async (req, res) => {
    try {
        const { id } = req.params;
        await pool.query('CALL sp_eliminar_reclamo(?)', [id]);
        res.json({ mensaje: 'Reclamo eliminado con éxito' });
    } catch (err) {
        res.status(500).json({ error: 'Error al eliminar el reclamo' });
    }
};

// Para la web
// Crear cliente + reclamo juntos
reclamoController.crearClienteYReclamo = async (req, res) => {
    try {
        const {
            nombres, apellidos, dni, direccion, telefono, correo, distrito,
            descripcion, fecha, estado
        } = req.body;

        const [rows] = await pool.query(
            "CALL sp_agregar_cliente_y_reclamo(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
            [
                nombres, apellidos, dni, direccion, telefono, correo, distrito,
                descripcion, fecha, estado || 'Pendiente'
            ]
        );

        res.status(201).json({
            mensaje: "Cliente y Reclamo creados con éxito",
            data: rows[0][0] // Devuelve {id_cliente, id_reclamo}
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Error al crear cliente y reclamo" });
    }
};


module.exports = reclamoController;
