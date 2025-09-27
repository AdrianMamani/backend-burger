const express = require('express');
const router = express.Router();
const categoriasController = require('../controllers/categorias.controller');
const multer = require('multer');
const path = require('path');

// Configuración de multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '../public/categorias'));
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        cb(null, uniqueSuffix + path.extname(file.originalname));
    }
});
const upload = multer({ storage });

// Rutas para categorías
router.get('/', categoriasController.obtenerCategorias);
router.get('/:id', categoriasController.obtenerCategoriaPorId); 
router.get('/:id/imagen', categoriasController.obtenerImagenCategoria);
router.post('/', upload.single('imagen_cat'), categoriasController.crearCategoria);
router.put('/:id', upload.single('imagen_cat'), categoriasController.actualizarCategoria);
router.patch('/:id/imagen', upload.single('imagen_cat'), categoriasController.actualizarImagenCategoria);
router.delete('/:id', categoriasController.eliminarCategoria);

module.exports = router;
