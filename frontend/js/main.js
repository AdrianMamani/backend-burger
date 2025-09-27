// Función para cargar componentes (sin cambios)
async function loadComponent(containerId, url) {
    const container = document.getElementById(containerId);
    if (container) { // Buena práctica: verificar si el contenedor existe
        const res = await fetch(url);
        container.innerHTML = await res.text();
    }
}

// NO cargues los componentes aquí. Lo haremos dentro del router.

function router() {
    const hash = location.hash || '#/';
    const app = document.getElementById('app');
    const header = document.getElementById('header');
    const footer = document.getElementById('footer');

    // Caso 1: Rutas de Login
    if (hash.startsWith('#login')) {
        // Limpiamos header y footer para asegurarnos de que no haya nada
        header.innerHTML = '';
        footer.innerHTML = '';
        loadComponent('app', 'views/login.html');

    // Caso 2: Rutas del panel de Administrador
    } else if (hash.startsWith('#admin')) {
        // Limpiamos header y footer también para el admin
        header.innerHTML = '';
        footer.innerHTML = '';

        // Creamos la estructura del panel de admin
        app.innerHTML = `
            <div class="flex h-screen bg-white overflow-hidden">
    <div id="sidebar"></div>
    <div class="flex-1 p-6 overflow-y-auto" id="admin-content"></div>
</div>
        `;
        loadComponent('sidebar', 'components/sidebar.html');

        // Cargamos la vista específica del admin
        if (hash === '#admin/dashboard') loadComponent('admin-content', 'views/admin/dashboard.html');
        if (hash === '#admin/productos') loadComponent('admin-content', 'views/admin/productos.html');
        if (hash === '#admin/marcas') loadComponent('admin-content', 'views/admin/marcas.html');
        if (hash === '#admin/categorias') loadComponent('admin-content', 'views/admin/categorias.html');
    
    // Caso 3: Todo lo demás es la Web Pública
    } else {
        // CARGAMOS header y footer SÓLO para la web pública
        loadComponent('header', 'components/header.html');
        loadComponent('footer', 'components/footer.html');

        // Cargar vistas públicas
        if (hash === '#/' || hash === '#/home') {
            loadComponent('app', 'views/home.html');
        }
        // Puedes agregar más rutas públicas aquí
        // else if (hash === '#/productos') { ... }
    }
}

window.addEventListener('hashchange', router);
window.addEventListener('load', router);