const pool = require('../config/db');

const usuariosController = {};

// Obtener todos los usuarios
usuariosController.obtenerUsuarios = async (req, res) => {
    try {
        const [rows] = await pool.query('CALL sp_ver_usuarios()');
        res.json(rows[0]);
    } catch (err) {
        res.status(500).json({ error: 'Error al obtener los usuarios' });
    }
};

// Obtener usuario por ID
usuariosController.obtenerUsuarioPorId = async (req, res) => {
    try {
        const { id } = req.params;
        const [rows] = await pool.query('SELECT id_usuario, nombre, correo FROM usuarios WHERE id_usuario = ?', [id]);
        if (rows.length > 0) {
            res.json(rows[0]);
        } else {
            res.status(404).json({ mensaje: 'Usuario no encontrado' });
        }
    } catch (err) {
        res.status(500).json({ error: 'Error al obtener el usuario' });
    }
};

// Crear nuevo usuario
usuariosController.crearUsuario = async (req, res) => {
    try {
        const { nombre, correo, contrasena } = req.body;
        await pool.query('CALL sp_insertar_usuario(?, ?, ?)', [nombre, correo, contrasena]);
        res.status(201).json({ mensaje: 'Usuario creado con éxito' });
    } catch (err) {
        res.status(500).json({ error: 'Error al crear el usuario' });
    }
};

// Actualizar usuario
usuariosController.actualizarUsuario = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre, correo, contrasena } = req.body;
        await pool.query('CALL sp_editar_usuario(?, ?, ?, ?)', [id, nombre, correo, contrasena]);
        res.json({ mensaje: 'Usuario actualizado con éxito' });
    } catch (err) {
        res.status(500).json({ error: 'Error al actualizar el usuario' });
    }
};

// Eliminar usuario
usuariosController.eliminarUsuario = async (req, res) => {
    try {
        const { id } = req.params;
        await pool.query('CALL sp_eliminar_usuario(?)', [id]);
        res.json({ mensaje: 'Usuario eliminado con éxito' });
    } catch (err) {
        res.status(500).json({ error: 'Error al eliminar el usuario' });
    }
};

// 🔹 Login de usuario
usuariosController.login = async (req, res) => {
    try {
        const { username, password } = req.body;

        // Busca el usuario en la DB
        const [rows] = await pool.query(
            'SELECT id_usuario, nombre, correo, contrasena FROM usuarios WHERE nombre = ?',
            [username]
        );

        if (rows.length === 0) {
            return res.status(401).json({ error: 'Usuario o contraseña incorrecta' });
        }

        const user = rows[0];

        // Verificar contraseña (sin hash por ahora)
        if (user.contrasena !== password) {
            return res.status(401).json({ error: 'Usuario o contraseña incorrecta' });
        }

        // Retorna datos del usuario (sin contraseña)
        res.json({ id_usuario: user.id_usuario, nombre: user.nombre, correo: user.correo });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error al iniciar sesión' });
    }
};

module.exports = usuariosController;
