const express = require("express");
const router = express.Router();
const marcasController = require("../controllers/marca.controller");
const multer = require("multer");
const path = require("path");

// Configuración de multer aquí
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, "../public/marcas"));
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({ storage });

// Rutas
router.get("/", marcasController.obtenerMarcas);
router.post("/", upload.single("imagen_marca"), marcasController.crearMarca);
router.put("/:id", upload.single("imagen_marca"), marcasController.actualizarMarca);
router.delete("/:id", marcasController.eliminarMarca);

module.exports = router;
