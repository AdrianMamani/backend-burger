const path = require("path");
const fs = require("fs");
const pool = require("../config/db");

const UPLOADS_FOLDER = path.join(__dirname, "../public/categorias");

// Crear carpeta si no existe
if (!fs.existsSync(UPLOADS_FOLDER)) {
    fs.mkdirSync(UPLOADS_FOLDER, { recursive: true });
}

const categoriasController = {};

// Obtener todas las categorías
categoriasController.obtenerCategorias = async (req, res) => {
    try {
        const [rows] = await pool.query("CALL sp_obtener_categorias()");
        res.json(rows[0]);
    } catch (err) {
        console.error("Error al obtener categorías:", err);
        res.status(500).json({ error: "Error al obtener las categorías" });
    }
};

// Crear nueva categoría
categoriasController.crearCategoria = async (req, res) => {
    try {
        const { nom_cat } = req.body;
        const file = req.file;

        if (!nom_cat) return res.status(400).json({ error: "El nombre de la categoría es requerido" });

        let imagePath = null;
        if (file) imagePath = `public/categorias/${file.filename}`;

        await pool.query("CALL sp_insertar_categoria(?, ?)", [nom_cat, imagePath]);
        res.status(201).json({ mensaje: "Categoría creada con éxito" });
    } catch (err) {
        console.error("Error al crear categoría:", err);
        res.status(500).json({ error: "Error al crear la categoría" });
    }
};

// Actualizar categoría
categoriasController.actualizarCategoria = async (req, res) => {
    try {
        const { id } = req.params;
        const { nom_cat } = req.body;
        const file = req.file;

        const [categoriaExistente] = await pool.query("CALL sp_obtener_categoria_por_id(?)", [id]);
        if (categoriaExistente[0].length === 0) return res.status(404).json({ mensaje: "Categoría no encontrada" });

        let imagePath = categoriaExistente[0][0].imagen_cat;
        if (file) {
            // eliminar imagen anterior si existe
            if (imagePath && fs.existsSync(path.join(__dirname, "../", imagePath))) {
                fs.unlinkSync(path.join(__dirname, "../", imagePath));
            }
            imagePath = `public/categorias/${file.filename}`;
        }

        await pool.query("CALL sp_actualizar_categoria(?, ?, ?)", [id, nom_cat, imagePath]);
        res.json({ mensaje: "Categoría actualizada con éxito" });
    } catch (err) {
        console.error("Error al actualizar categoría:", err);
        res.status(500).json({ error: "Error al actualizar la categoría" });
    }
};

// Eliminar categoría
categoriasController.eliminarCategoria = async (req, res) => {
    try {
        const { id } = req.params;
        const [categoriaExistente] = await pool.query("CALL sp_obtener_categoria_por_id(?)", [id]);
        if (categoriaExistente[0].length === 0) return res.status(404).json({ mensaje: "Categoría no encontrada" });

        const imagePath = categoriaExistente[0][0].imagen_cat;
        if (imagePath && fs.existsSync(path.join(__dirname, "../", imagePath))) {
            fs.unlinkSync(path.join(__dirname, "../", imagePath));
        }

        await pool.query("CALL sp_eliminar_categoria(?)", [id]);
        res.json({ mensaje: "Categoría eliminada con éxito" });
    } catch (err) {
        console.error("Error al eliminar categoría:", err);
        if (err.code === "ER_ROW_IS_REFERENCED_2") {
            return res.status(400).json({ error: "No se puede eliminar la categoría porque tiene productos asociados" });
        }
        res.status(500).json({ error: "Error al eliminar la categoría" });
    }
};

// Obtener solo la imagen
categoriasController.obtenerImagenCategoria = async (req, res) => {
    try {
        const { id } = req.params;
        const [categoriaExistente] = await pool.query("CALL sp_obtener_categoria_por_id(?)", [id]);
        if (categoriaExistente[0].length === 0) return res.status(404).json({ mensaje: "Categoría no encontrada" });

        const imagePath = categoriaExistente[0][0].imagen_cat;
        if (!imagePath) return res.status(404).json({ mensaje: "La categoría no tiene imagen" });

        res.sendFile(path.join(__dirname, "../", imagePath));
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Error al obtener la imagen" });
    }
};

// Actualizar solo la imagen
categoriasController.actualizarImagenCategoria = async (req, res) => {
    try {
        const { id } = req.params;
        const file = req.file;
        if (!file) return res.status(400).json({ error: "Archivo no enviado" });

        const [categoriaExistente] = await pool.query("CALL sp_obtener_categoria_por_id(?)", [id]);
        if (categoriaExistente[0].length === 0) return res.status(404).json({ mensaje: "Categoría no encontrada" });

        const oldImage = categoriaExistente[0][0].imagen_cat;
        if (oldImage && fs.existsSync(path.join(__dirname, "../", oldImage))) {
            fs.unlinkSync(path.join(__dirname, "../", oldImage));
        }

        const imagePath = `public/categorias/${file.filename}`;
        await pool.query("CALL sp_actualizar_categoria(?, ?, ?)", [id, categoriaExistente[0][0].nom_cat, imagePath]);

        res.json({ mensaje: "Imagen de categoría actualizada con éxito" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Error al actualizar la imagen" });
    }
};

// Obtener categoría por ID
categoriasController.obtenerCategoriaPorId = async (req, res) => {
    try {
        const { id } = req.params;
        const [categoriaExistente] = await pool.query("CALL sp_obtener_categoria_por_id(?)", [id]);
        
        if (categoriaExistente[0].length === 0) {
            return res.status(404).json({ mensaje: "Categoría no encontrada" });
        }

        // Devolver la primera fila (la categoría encontrada)
        res.json(categoriaExistente[0][0]);
    } catch (err) {
        console.error("Error al obtener categoría por ID:", err);
        res.status(500).json({ error: "Error al obtener la categoría" });
    }
};


module.exports = categoriasController;
