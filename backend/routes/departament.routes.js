const express = require('express');
const router = express.Router();
const departamentoController = require('../controllers/departamento.controller');

// Obtener todos los departamentos
router.get('/', departamentoController.obtenerDepartamentos);

// Obtener un departamento por ID
router.get('/:id', departamentoController.obtenerDepartamentoPorId);

// Crear un nuevo departamento
router.post('/', departamentoController.crearDepartamento);

// Actualizar un departamento
router.put('/:id', departamentoController.actualizarDepartamento);

// Eliminar un departamento
router.delete('/:id', departamentoController.eliminarDepartamento);

module.exports = router; 
