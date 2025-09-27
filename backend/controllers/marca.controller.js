const path = require("path");
const fs = require("fs");
const pool = require("../config/db");

const UPLOADS_FOLDER = path.join(__dirname, "../public/marcas");

// Crear carpeta si no existe
if (!fs.existsSync(UPLOADS_FOLDER)) {
    fs.mkdirSync(UPLOADS_FOLDER, { recursive: true });
}

const marcasController = {};

// 📌 Obtener todas las marcas
marcasController.obtenerMarcas = async (req, res) => {
    try {
        const [rows] = await pool.query("CALL sp_obtener_marcas()");
        res.json(rows[0]);
    } catch (err) {
        console.error("Error al obtener marcas:", err);
        res.status(500).json({ error: "Error al obtener las marcas" });
    }
};

// 📌 Crear nueva marca
marcasController.crearMarca = async (req, res) => {
    try {
        const { nom_marca } = req.body;
        const file = req.file;

        if (!nom_marca) {
            return res.status(400).json({ error: "El nombre de la marca es requerido" });
        }

        let imagePath = null;
        if (file) {
            imagePath = `public/marcas/${file.filename}`;
        }

        await pool.query("CALL sp_insertar_marca(?, ?)", [nom_marca, imagePath]);
        res.status(201).json({ mensaje: "Marca creada con éxito" });
    } catch (err) {
        console.error("Error al crear marca:", err);
        res.status(500).json({ error: "Error al crear la marca" });
    }
};

// 📌 Actualizar marca
marcasController.actualizarMarca = async (req, res) => {
    try {
        const { id } = req.params;
        const { nom_marca } = req.body;
        const file = req.file;

        const [marcaExistente] = await pool.query("CALL sp_obtener_marca_por_id(?)", [id]);
        if (marcaExistente[0].length === 0) {
            return res.status(404).json({ mensaje: "Marca no encontrada" });
        }

        let imagePath = marcaExistente[0][0].imagen_marca;
        if (file) {
            // eliminar imagen anterior si existe
            if (imagePath && fs.existsSync(path.join(__dirname, "../", imagePath))) {
                fs.unlinkSync(path.join(__dirname, "../", imagePath));
            }
            imagePath = `public/marcas/${file.filename}`;
        }

        await pool.query("CALL sp_actualizar_marca(?, ?, ?)", [id, nom_marca, imagePath]);
        res.json({ mensaje: "Marca actualizada con éxito" });
    } catch (err) {
        console.error("Error al actualizar marca:", err);
        res.status(500).json({ error: "Error al actualizar la marca" });
    }
};

// 📌 Eliminar marca
marcasController.eliminarMarca = async (req, res) => {
    try {
        const { id } = req.params;

        const [marcaExistente] = await pool.query("CALL sp_obtener_marca_por_id(?)", [id]);
        if (marcaExistente[0].length === 0) {
            return res.status(404).json({ mensaje: "Marca no encontrada" });
        }

        const imagePath = marcaExistente[0][0].imagen_marca;
        if (imagePath && fs.existsSync(path.join(__dirname, "../", imagePath))) {
            fs.unlinkSync(path.join(__dirname, "../", imagePath));
        }

        await pool.query("CALL sp_eliminar_marca(?)", [id]);
        res.json({ mensaje: "Marca eliminada con éxito" });
    } catch (err) {
        console.error("Error al eliminar marca:", err);
        if (err.code === "ER_ROW_IS_REFERENCED_2") {
            return res.status(400).json({
                error: "No se puede eliminar la marca porque tiene productos asociados",
            });
        }
        res.status(500).json({ error: "Error al eliminar la marca" });
    }
};

module.exports = marcasController;
