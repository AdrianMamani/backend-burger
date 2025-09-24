const express = require('express');
const router = express.Router();
const controlador = require('../controllers/unidades.controller');

router.get('/', controlador.obtenerUnidades);
router.get('/:id', controlador.obtenerUnidadPorId);
router.post('/', controlador.crearUnidad);
router.put('/:id', controlador.actualizarUnidad);
router.delete('/:id', controlador.eliminarUnidad);

module.exports = router;