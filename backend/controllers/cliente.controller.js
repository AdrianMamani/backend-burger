const pool = require('../config/db');

const clienteController = {};

// 📌 Listar todos los clientes
clienteController.obtenerClientes = async (req, res) => {
    try {
        const [rows] = await pool.query('CALL sp_listar_clientes()');
        res.json(rows[0]);
    } catch (err) {
        res.status(500).json({ error: 'Error al obtener los clientes' });
    }
};

// 📌 Obtener cliente por ID
clienteController.obtenerClientePorId = async (req, res) => {
    try {
        const { id } = req.params;
        const [rows] = await pool.query('CALL sp_obtener_cliente_por_id(?)', [id]);
        if (rows[0].length > 0) {
            res.json(rows[0][0]);
        } else {
            res.status(404).json({ mensaje: 'Cliente no encontrado' });
        }
    } catch (err) {
        res.status(500).json({ error: 'Error al obtener el cliente' });
    }
};

// 📌 Crear cliente
clienteController.crearCliente = async (req, res) => {
    try {
        const { nombres, apellidos, dni, direccion, telefono, correo, id_distrito } = req.body;
        await pool.query(
            'CALL sp_agregar_cliente(?, ?, ?, ?, ?, ?, ?)',
            [nombres, apellidos, dni, direccion, telefono, correo, id_distrito]
        );
        res.status(201).json({ mensaje: 'Cliente creado con éxito' });
    } catch (err) {
        res.status(500).json({ error: 'Error al crear el cliente' });
    }
};

// 📌 Actualizar cliente
clienteController.actualizarCliente = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombres, apellidos, dni, direccion, telefono, correo, id_distrito } = req.body;
        await pool.query(
            'CALL sp_actualizar_cliente(?, ?, ?, ?, ?, ?, ?, ?)',
            [id, nombres, apellidos, dni, direccion, telefono, correo, id_distrito]
        );
        res.json({ mensaje: 'Cliente actualizado con éxito' });
    } catch (err) {
        res.status(500).json({ error: 'Error al actualizar el cliente' });
    }
};

// 📌 Eliminar cliente
clienteController.eliminarCliente = async (req, res) => {
    try {
        const { id } = req.params;
        await pool.query('CALL sp_eliminar_cliente(?)', [id]);
        res.json({ mensaje: 'Cliente eliminado con éxito' });
    } catch (err) {
        res.status(500).json({ error: 'Error al eliminar el cliente' });
    }
};

module.exports = clienteController;
