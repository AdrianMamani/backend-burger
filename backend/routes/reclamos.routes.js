const express = require('express');
const router = express.Router();
const reclamoController = require('../controllers/reclamos.controller');

// Obtener todos los reclamos
router.get('/', reclamoController.obtenerReclamos);

// Obtener un reclamo por ID
router.get('/:id', reclamoController.obtenerReclamoPorId);

// Crear un nuevo reclamo (cliente ya existente)
router.post('/', reclamoController.crearReclamo);

// Crear cliente + reclamo en un solo paso
router.post('/con-cliente', reclamoController.crearClienteYReclamo);

// Actualizar un reclamo
router.put('/:id', reclamoController.actualizarReclamo);

// Eliminar un reclamo
router.delete('/:id', reclamoController.eliminarReclamo);

module.exports = router;
