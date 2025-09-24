const pool = require('../config/db');

const productosController = {};

// Obtener todos los productos
productosController.obtenerProductos = async (req, res) => {
    try {
        const [rows] = await pool.query('CALL sp_obtener_productos()');
        res.json(rows[0]);
    } catch (err) {
        res.status(500).json({ error: 'Error al obtener los productos' });
    }
};

// Obtener producto por ID
productosController.obtenerProductoPorId = async (req, res) => {
    try {
        const { id } = req.params;
        const [rows] = await pool.query('CALL sp_obtener_producto_por_id(?)', [id]);
        if (rows[0].length > 0) {
            res.json(rows[0][0]);
        } else {
            res.status(404).json({ mensaje: 'Producto no encontrado' });
        }
    } catch (err) {
        res.status(500).json({ error: 'Error al obtener el producto' });
    }
};

// Crear nuevo producto
productosController.crearProducto = async (req, res) => {
    try {
        const { nom_pro, pre_pro, id_uni, id_marca, id_cat, stk_pro, estado } = req.body;
        await pool.query('CALL sp_insertar_producto(?, ?, ?, ?, ?, ?, ?)', 
            [nom_pro, pre_pro, id_uni, id_marca, id_cat, stk_pro, estado]);
        res.status(201).json({ mensaje: 'Producto creado con éxito' });
    } catch (err) {
        res.status(500).json({ error: 'Error al crear el producto' });
    }
};

// Actualizar producto
productosController.actualizarProducto = async (req, res) => {
    try {
        const { id } = req.params;
        const { nom_pro, pre_pro, id_uni, id_marca, id_cat, stk_pro, estado } = req.body;
        await pool.query('CALL sp_actualizar_producto(?, ?, ?, ?, ?, ?, ?, ?)', 
            [id, nom_pro, pre_pro, id_uni, id_marca, id_cat, stk_pro, estado]);
        res.json({ mensaje: 'Producto actualizado con éxito' });
    } catch (err) {
        res.status(500).json({ error: 'Error al actualizar el producto' });
    }
};

// Eliminar producto
productosController.eliminarProducto = async (req, res) => {
    try {
        const { id } = req.params;
        await pool.query('CALL sp_eliminar_producto(?)', [id]);
        res.json({ mensaje: 'Producto eliminado con éxito' });
    } catch (err) {
        res.status(500).json({ error: 'Error al eliminar el producto' });
    }
};

module.exports = productosController;
