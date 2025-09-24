const express = require('express');
const router = express.Router();
const controlador = require('../controllers/producto.controller');

router.get('/', controlador.obtenerProductos);
router.get('/:id', controlador.obtenerProductoPorId);
router.post('/', controlador.crearProducto);
router.put('/:id', controlador.actualizarProducto);
router.delete('/:id', controlador.eliminarProducto);

module.exports = router;