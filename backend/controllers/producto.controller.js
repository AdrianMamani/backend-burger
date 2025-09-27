const path = require("path");
const fs = require("fs");
const pool = require("../config/db");

const UPLOADS_FOLDER = path.join(__dirname, "../public/productos");

// Crear carpeta si no existe
if (!fs.existsSync(UPLOADS_FOLDER)) {
    fs.mkdirSync(UPLOADS_FOLDER, { recursive: true });
}

const productosController = {};

// 📌 Obtener todos los productos
productosController.obtenerProductos = async (req, res) => {
    try {
        const [rows] = await pool.query("CALL sp_obtener_productos()");
        res.json(rows[0]);
    } catch (err) {
        console.error("Error al obtener productos:", err);
        res.status(500).json({ error: "Error al obtener los productos" });
    }
};

// 📌 Obtener producto por ID
productosController.obtenerProductoPorId = async (req, res) => {
    try {
        const { id } = req.params;
        const [rows] = await pool.query("CALL sp_obtener_producto_por_id(?)", [id]);

        if (rows[0].length > 0) {
            res.json(rows[0][0]);
        } else {
            res.status(404).json({ mensaje: "Producto no encontrado" });
        }
    } catch (err) {
        console.error("Error al obtener producto por ID:", err);
        res.status(500).json({ error: "Error al obtener el producto" });
    }
};

// 📌 Crear producto
productosController.crearProducto = async (req, res) => {
    try {
        const {
            nom_pro,
            descripcion_pro,
            pre_pro,
            id_uni,
            id_marca,
            id_cat,
            stk_pro,
            estado,
        } = req.body;
        const file = req.file;

        if (!nom_pro || !pre_pro || !stk_pro) {
            return res
                .status(400)
                .json({ error: "Nombre, precio y stock son requeridos" });
        }

        let imagePath = null;
        if (file) {
            imagePath = `public/productos/${file.filename}`;
        }

        await pool.query("CALL sp_insertar_producto(?, ?, ?, ?, ?, ?, ?, ?, ?)", [
            nom_pro,
            descripcion_pro || "",
            pre_pro,
            id_uni,
            id_marca,
            id_cat,
            stk_pro,
            imagePath,
            estado || "A",
        ]);

        res.status(201).json({ mensaje: "Producto creado con éxito" });
    } catch (err) {
        console.error("Error al crear producto:", err);
        res.status(500).json({ error: "Error al crear el producto" });
    }
};

// 📌 Actualizar producto
productosController.actualizarProducto = async (req, res) => {
    try {
        const { id } = req.params;
        const {
            nom_pro,
            descripcion_pro,
            pre_pro,
            id_uni,
            id_marca,
            id_cat,
            stk_pro,
            estado,
        } = req.body;
        const file = req.file;

        const [productoExistente] = await pool.query(
            "CALL sp_obtener_producto_por_id(?)",
            [id]
        );

        if (productoExistente[0].length === 0) {
            return res.status(404).json({ mensaje: "Producto no encontrado" });
        }

        let imagePath = productoExistente[0][0].imagen_pro;
        if (file) {
            // Eliminar imagen anterior si existe
            if (imagePath && fs.existsSync(path.join(__dirname, "../", imagePath))) {
                fs.unlinkSync(path.join(__dirname, "../", imagePath));
            }
            imagePath = `public/productos/${file.filename}`;
        }

        await pool.query("CALL sp_actualizar_producto(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", [
            id,
            nom_pro,
            descripcion_pro,
            pre_pro,
            id_uni,
            id_marca,
            id_cat,
            stk_pro,
            imagePath,
            estado,
        ]);

        res.json({ mensaje: "Producto actualizado con éxito" });
    } catch (err) {
        console.error("Error al actualizar producto:", err);
        res.status(500).json({ error: "Error al actualizar el producto" });
    }
};

// 📌 Eliminar producto
productosController.eliminarProducto = async (req, res) => {
    try {
        const { id } = req.params;

        const [productoExistente] = await pool.query(
            "CALL sp_obtener_producto_por_id(?)",
            [id]
        );

        if (productoExistente[0].length === 0) {
            return res.status(404).json({ mensaje: "Producto no encontrado" });
        }

        const imagePath = productoExistente[0][0].imagen_pro;
        if (imagePath && fs.existsSync(path.join(__dirname, "../", imagePath))) {
            fs.unlinkSync(path.join(__dirname, "../", imagePath));
        }

        await pool.query("CALL sp_eliminar_producto(?)", [id]);
        res.json({ mensaje: "Producto eliminado con éxito" });
    } catch (err) {
        console.error("Error al eliminar producto:", err);
        res.status(500).json({ error: "Error al eliminar el producto" });
    }
};

module.exports = productosController;
