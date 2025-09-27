const express = require('express');
const router = express.Router();
const provinciaController = require('../controllers/provincia.controller');

// Obtener provincias por departamento (web)
router.get('/por-departamento', provinciaController.obtenerProvinciasPorDepartamento);
module.exports = router;
// Obtener todas las provincias
router.get('/', provinciaController.obtenerProvincias);

// Obtener una provincia por ID
router.get('/:id', provinciaController.obtenerProvinciaPorId);

// Crear una nueva provincia
router.post('/', provinciaController.crearProvincia);

// Actualizar una provincia
router.put('/:id', provinciaController.actualizarProvincia);

// Eliminar una provincia
router.delete('/:id', provinciaController.eliminarProvincia);

