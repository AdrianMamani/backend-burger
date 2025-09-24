// Función para cargar componentes
async function loadComponent(containerId, url) {
    const container = document.getElementById(containerId);
    const res = await fetch(url);
    container.innerHTML = await res.text();
}

// Cargar header y footer al inicio
loadComponent('header', 'components/header.html');
loadComponent('footer', 'components/footer.html');

function router() {
    const hash = location.hash || '#/';
    const app = document.getElementById('app');
    const header = document.getElementById('header');
    const footer = document.getElementById('footer');

    if (hash.startsWith('#login')) {
        // Ocultar header y footer en login
        header.style.display = 'none';
        footer.style.display = 'none';

        loadComponent('app', 'views/login.html');
    } else {
        // Mostrar header y footer en web pública y admin
        header.style.display = 'block';
        footer.style.display = 'block';

        if (hash.startsWith('#admin')) {
            // Panel admin con sidebar
            app.innerHTML = `
                <div class="flex">
                    <div id="sidebar"></div>
                    <div class="flex-1 p-6" id="admin-content"></div>
                </div>
            `;
            loadComponent('sidebar', 'components/sidebar.html');

            if (hash === '#admin/dashboard') loadComponent('admin-content', 'views/admin/dashboard.html');
            if (hash === '#admin/productos') loadComponent('admin-content', 'views/admin/productos.html');
            if (hash === '#admin/marcas') loadComponent('admin-content', 'views/admin/marcas.html');
            if (hash === '#admin/categorias') loadComponent('admin-content', 'views/admin/categorias.html');
        } else {
            // Web pública
            loadComponent('app', 'views/home.html');
        }
    }
}


window.addEventListener('hashchange', router);
window.addEventListener('load', router);
