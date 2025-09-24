const express = require('express');
const router = express.Router();
const controlador = require('../controllers/marca.controller');

router.get('/', controlador.obtenerMarcas);
router.get('/:id', controlador.obtenerMarcaPorId);
router.post('/', controlador.crearMarca);
router.put('/:id', controlador.actualizarMarca);
router.delete('/:id', controlador.eliminarMarca);

module.exports = router;