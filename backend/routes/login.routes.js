const express = require('express');
const router = express.Router();
const usuariosController = require('../controllers/login.controller');

// Endpoints CRUD
router.get('/', usuariosController.obtenerUsuarios);
router.get('/:id', usuariosController.obtenerUsuarioPorId);
router.post('/', usuariosController.crearUsuario);
router.put('/:id', usuariosController.actualizarUsuario);
router.delete('/:id', usuariosController.eliminarUsuario);

// 🔹 Endpoint de login
router.post('/login', usuariosController.login);

module.exports = router;
