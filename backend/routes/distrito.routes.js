const express = require('express');
const router = express.Router();
const distritoController = require('../controllers/distrito.controller');

// Obtener distritos por provincia (web)
router.get('/por-provincia', distritoController.obtenerDistritosPorProvincia);
// Obtener todos los distritos
router.get('/', distritoController.obtenerDistritos);

// Obtener un distrito por ID
router.get('/:id', distritoController.obtenerDistritoPorId);

// Crear un nuevo distrito
router.post('/', distritoController.crearDistrito);

// Actualizar un distrito
router.put('/:id', distritoController.actualizarDistrito);

// Eliminar un distrito
router.delete('/:id', distritoController.eliminarDistrito);


module.exports = router;
