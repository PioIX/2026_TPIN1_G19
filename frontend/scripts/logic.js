document.addEventListener('DOMContentLoaded', () => {
    const formLogin = document.getElementById('form-login');
    const formRegistro = document.getElementById('form-registro');

    if (formLogin) formLogin.addEventListener('submit', manejarLogin);
    if (formRegistro) formRegistro.addEventListener('submit', manejarRegistro);
});

async function manejarLogin(e) {
    e.preventDefault();

    const usuario = document.getElementById('login-usuario').value.trim();
    const contrasena = document.getElementById('login-contrasena').value;

    const respuesta = await fetch('http://localhost:4000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ usuario, contrasena })
    });

    const data = await respuesta.json();

    if (!respuesta.ok) {
        document.getElementById('mensaje-login').textContent = data.mensaje;
        return;
    }

    localStorage.setItem('usuarioActivo', JSON.stringify(data.usuario));

    if (data.usuario.is_admin) {
        window.location.href = 'admin.html';
    } else {
        window.location.href = 'inicio.html';
    }
}

async function manejarRegistro(e) {
    e.preventDefault();

    const dni = document.getElementById('registro-dni').value.trim();
    const nombre = document.getElementById('registro-nombre').value.trim();
    const usuario = document.getElementById('registro-usuario').value.trim();
    const contrasena = document.getElementById('registro-contrasena').value;

    if (dni.length !== 8 || isNaN(dni)) {
    document.getElementById('mensaje-registro').textContent = 'El DNI debe tener exactamente 8 dígitos.';
    return;
}
    const respuesta = await fetch('http://localhost:4000/registro', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ dni, nombre, usuario, contrasena })
    });

    const data = await respuesta.json();

    if (!respuesta.ok) {
        document.getElementById('mensaje-registro').textContent = data.mensaje;
        return;
    }

    alert('Cuenta creada. Iniciá sesión.');
    window.location.href = 'index.html';
}