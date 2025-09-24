const express = require('express');
const cors = require('cors');
const path = require('path');

// Importa las rutas
const productosRoutes = require('./routes/productos.routes');
const unidadesRoutes = require('./routes/unidades.routes');
const marcasRoutes = require('./routes/marcas.routes');
const categoriasRoutes = require('./routes/categorias.routes');
const usuarioRoutes = require('./routes/login.routes');

const app = express();

app.use(cors());
app.use(express.json());

// Servir archivos estáticos del frontend
app.use(express.static(path.join(__dirname, '../frontend')));

// Rutas de la API
app.use('/api/productos', productosRoutes);
app.use('/api/unidades', unidadesRoutes);
app.use('/api/marcas', marcasRoutes);
app.use('/api/categorias', categoriasRoutes);
app.use('/api/usuario', usuarioRoutes);

// Servir frontend solo para rutas que NO empiecen con /api
app.use((req, res, next) => {
    if (req.path.startsWith('/api')) return next();
    res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor de la API y el Frontend en el puerto ${PORT}`);
});
