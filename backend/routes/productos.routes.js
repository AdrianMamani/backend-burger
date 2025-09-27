// routes/productos.routes.js
const express = require("express");
const multer = require("multer");
const path = require("path");
const productosController = require("../controllers/producto.controller");

const router = express.Router();

// 📂 Configuración de multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, "../public/productos"));
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    },
});
const upload = multer({ storage });

// 📌 Rutas para productos
router.get("/", productosController.obtenerProductos);
router.get("/:id", productosController.obtenerProductoPorId);

router.post("/", upload.single("imagen_pro"), productosController.crearProducto);
router.put("/:id", upload.single("imagen_pro"), productosController.actualizarProducto);
router.delete("/:id", productosController.eliminarProducto);

module.exports = router;
