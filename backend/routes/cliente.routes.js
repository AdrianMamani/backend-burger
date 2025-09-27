const express = require('express');
const router = express.Router();
const clienteController = require('../controllers/cliente.controller');

// Obtener todos los clientes
router.get('/', clienteController.obtenerClientes);

// Obtener un cliente por ID
router.get('/:id', clienteController.obtenerClientePorId);

// Crear un nuevo cliente
router.post('/', clienteController.crearCliente);

// Actualizar un cliente
router.put('/:id', clienteController.actualizarCliente);

// Eliminar un cliente
router.delete('/:id', clienteController.eliminarCliente);

module.exports = router;
