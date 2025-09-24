document.addEventListener('submit', async (e) => {
    if (e.target.id !== 'login-form') return;
    e.preventDefault();

    const username = document.getElementById('username').value; // usa el mismo nombre que espera el backend
    const password = document.getElementById('password').value;

    try {
        const res = await fetch('http://localhost:3000/api/usuario/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password }) // ahora coincide
        });

        if (!res.ok) throw new Error('Usuario o contraseña incorrecta');

        const data = await res.json();
        localStorage.setItem('loggedIn', 'true');
        localStorage.setItem('user', JSON.stringify(data));
        location.hash = '#admin/dashboard'; // redirige al panel
    } catch (error) {
        alert(error.message);
    }
});
