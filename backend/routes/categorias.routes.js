const express = require('express');
const router = express.Router();
const controlador = require('../controllers/categorias.controller');

// Rutas de categorías
router.get('/', controlador.obtenerCategorias);
router.get('/:id', controlador.obtenerCategoriaPorId);
router.post('/', controlador.crearCategoria);
router.put('/:id', controlador.actualizarCategoria);
router.delete('/:id', controlador.eliminarCategoria);

module.exports = router;
