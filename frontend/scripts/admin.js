document.addEventListener('DOMContentLoaded', () => {
    const usuarioActivo = JSON.parse(localStorage.getItem('usuarioActivo'));
    if (!usuarioActivo || !usuarioActivo.is_admin) {
        alert('Acceso denegado.');
        window.location.href = 'index.html';
        return;
    }

    document.getElementById('nombre-admin').textContent = usuarioActivo.nombre;

    // Tabs
    const tabs = ['jugadores', 'equipos', 'ligas', 'paises', 'posiciones', 'usuarios', 'partidas'];
    tabs.forEach(tab => {
        document.getElementById('btn-tab-' + tab).addEventListener('click', () => {
            mostrarSeccion(tab);
            cargarFunciones[tab]();
        });
    });

    // Formularios
    document.getElementById('form-jugador').addEventListener('submit', guardarJugador);
    document.getElementById('btn-cancelar-jugador').addEventListener('click', cancelarEdicionJugador);
    document.getElementById('form-equipo').addEventListener('submit', (e) => guardarSimple(e, 'equipos', 'eq-nombre', 'mensaje-equipos', cargarEquipos));
    document.getElementById('form-liga').addEventListener('submit', (e) => guardarSimple(e, 'ligas', 'li-nombre', 'mensaje-ligas', cargarLigas));
    document.getElementById('form-pais').addEventListener('submit', (e) => guardarSimple(e, 'paises', 'pa-nombre', 'mensaje-paises', cargarPaises));
    document.getElementById('form-posicion').addEventListener('submit', (e) => guardarSimple(e, 'posiciones', 'pos-nombre', 'mensaje-posiciones', cargarPosiciones));

    document.getElementById('btn-cerrar-sesion').addEventListener('click', () => {
        localStorage.removeItem('usuarioActivo');
        window.location.href = 'index.html';
    });

    // Cargar jugadores por defecto
    mostrarSeccion('jugadores');
    cargarJugadores();
});

const cargarFunciones = {
    jugadores:  cargarJugadores,
    equipos:    cargarEquipos,
    ligas:      cargarLigas,
    paises:     cargarPaises,
    posiciones: cargarPosiciones,
    usuarios:   cargarUsuarios,
    partidas:   cargarPartidas
};

function mostrarSeccion(seccion) {
    document.querySelectorAll('.seccion').forEach(s => s.classList.remove('activa'));
    document.querySelectorAll('.btn-tab').forEach(b => b.classList.remove('activo'));
    document.getElementById('seccion-' + seccion).classList.add('activa');
    document.getElementById('btn-tab-' + seccion).classList.add('activo');
}

//JUGADORES

let editandoId = null;

async function cargarJugadores() {
    // Cargar selects
    await Promise.all([cargarSelectLigas(), cargarSelectPaises(), cargarSelectEquipos(), cargarSelectPosiciones()]);

    const respuesta = await fetch('http://localhost:4000/admin/jugadores');
    const data = await respuesta.json();
    const tbody = document.getElementById('tabla-jugadores');
    tbody.innerHTML = '';

    if (!data.jugadores || data.jugadores.length === 0) {
        tbody.innerHTML = '<tr><td colspan="7">No hay jugadores cargados.</td></tr>';
        return;
    }

    data.jugadores.forEach(j => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${j.id}</td>
            <td>${j.nombre}</td>
            <td>${j.liga}</td>
            <td>${j.pais}</td>
            <td>${j.equipo}</td>
            <td>${j.posicion}</td>
            <td class="acciones">
                <button class="btn-editar" onclick="iniciarEdicionJugador(${j.id}, '${escapar(j.nombre)}')">Editar</button>
                <button class="btn-eliminar" onclick="eliminarJugador(${j.id})">Eliminar</button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

async function cargarSelectLigas() {
    const r = await fetch('http://localhost:4000/admin/ligas');
    const data = await r.json();
    const select = document.getElementById('j-liga');
    select.innerHTML = data.ligas.map(l => `<option value="${l.id}">${l.nombre}</option>`).join('');
}

async function cargarSelectPaises() {
    const r = await fetch('http://localhost:4000/admin/paises');
    const data = await r.json();
    const select = document.getElementById('j-pais');
    select.innerHTML = data.paises.map(p => `<option value="${p.id}">${p.nombre}</option>`).join('');
}

async function cargarSelectEquipos() {
    const r = await fetch('http://localhost:4000/admin/equipos');
    const data = await r.json();
    const select = document.getElementById('j-equipo');
    select.innerHTML = data.equipos.map(e => `<option value="${e.id}">${e.nombre}</option>`).join('');
}

async function cargarSelectPosiciones() {
    const r = await fetch('http://localhost:4000/admin/posiciones');
    const data = await r.json();
    const select = document.getElementById('j-posicion');
    select.innerHTML = data.posiciones.map(p => `<option value="${p.id}">${p.nombre}</option>`).join('');
}

function iniciarEdicionJugador(id, nombre) {
    editandoId = id;
    document.getElementById('titulo-form-jugador').textContent = 'Editar Jugador';
    document.getElementById('j-nombre').value = nombre;
    document.getElementById('btn-cancelar-jugador').style.display = 'inline-block';
    document.getElementById('form-jugador').scrollIntoView({ behavior: 'smooth' });
}

function cancelarEdicionJugador() {
    editandoId = null;
    document.getElementById('titulo-form-jugador').textContent = 'Agregar Jugador';
    document.getElementById('form-jugador').reset();
    document.getElementById('btn-cancelar-jugador').style.display = 'none';
}

async function guardarJugador(e) {
    e.preventDefault();

    const body = {
        nombre:      document.getElementById('j-nombre').value.trim(),
        id_liga:     document.getElementById('j-liga').value,
        id_pais:     document.getElementById('j-pais').value,
        id_equipo:   document.getElementById('j-equipo').value,
        id_posicion: document.getElementById('j-posicion').value
    };

    const url    = editandoId ? `http://localhost:4000/admin/jugadores/${editandoId}` : 'http://localhost:4000/admin/jugadores';
    const method = editandoId ? 'PUT' : 'POST';

    const respuesta = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
    });

    const data = await respuesta.json();
    mostrarMensaje('mensaje-jugadores', data.mensaje, respuesta.ok);

    if (respuesta.ok) {
        cancelarEdicionJugador();
        cargarJugadores();
    }
}

async function eliminarJugador(id) {
    if (!confirm('¿Seguro que querés eliminar este jugador?')) return;
    const respuesta = await fetch(`http://localhost:4000/admin/jugadores/${id}`, { method: 'DELETE' });
    const data = await respuesta.json();
    mostrarMensaje('mensaje-jugadores', data.mensaje, respuesta.ok);
    cargarJugadores();
}

//SIMPLE (equipos, ligas, paises, posiciones)

async function guardarSimple(e, ruta, inputId, mensajeId, recargar) {
    e.preventDefault();
    const nombre = document.getElementById(inputId).value.trim();

    const respuesta = await fetch(`http://localhost:4000/admin/${ruta}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nombre })
    });

    const data = await respuesta.json();
    mostrarMensaje(mensajeId, data.mensaje, respuesta.ok);

    if (respuesta.ok) {
        document.getElementById(inputId).value = '';
        recargar();
    }
}

async function eliminarSimple(ruta, id, mensajeId, recargar) {
    if (!confirm('¿Seguro que querés eliminar?')) return;
    const respuesta = await fetch(`http://localhost:4000/admin/${ruta}/${id}`, { method: 'DELETE' });
    const data = await respuesta.json();
    mostrarMensaje(mensajeId, data.mensaje, respuesta.ok);
    recargar();
}

function construirTablaSimple(items, clave, tbodyId, mensajeId, ruta, recargar) {
    const tbody = document.getElementById(tbodyId);
    tbody.innerHTML = '';
    if (!items || items.length === 0) {
        tbody.innerHTML = `<tr><td colspan="3">No hay datos cargados.</td></tr>`;
        return;
    }
    items.forEach(item => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${item.id}</td>
            <td>${item.nombre}</td>
            <td class="acciones">
                <button class="btn-eliminar" onclick="eliminarSimple('${ruta}', ${item.id}, '${mensajeId}', ${recargar.name})">Eliminar</button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

async function cargarEquipos() {
    const r = await fetch('http://localhost:4000/admin/equipos');
    const data = await r.json();
    construirTablaSimple(data.equipos, 'nombre', 'tabla-equipos', 'mensaje-equipos', 'equipos', cargarEquipos);
}

async function cargarLigas() {
    const r = await fetch('http://localhost:4000/admin/ligas');
    const data = await r.json();
    construirTablaSimple(data.ligas, 'nombre', 'tabla-ligas', 'mensaje-ligas', 'ligas', cargarLigas);
}

async function cargarPaises() {
    const r = await fetch('http://localhost:4000/admin/paises');
    const data = await r.json();
    construirTablaSimple(data.paises, 'nombre', 'tabla-paises', 'mensaje-paises', 'paises', cargarPaises);
}

async function cargarPosiciones() {
    const r = await fetch('http://localhost:4000/admin/posiciones');
    const data = await r.json();
    construirTablaSimple(data.posiciones, 'nombre', 'tabla-posiciones', 'mensaje-posiciones', 'posiciones', cargarPosiciones);
}

//USUARIOS

async function cargarUsuarios() {
    const respuesta = await fetch('http://localhost:4000/admin/usuarios');
    const data = await respuesta.json();
    const tbody = document.getElementById('tabla-usuarios');
    tbody.innerHTML = '';

    if (!data.usuarios || data.usuarios.length === 0) {
        tbody.innerHTML = '<tr><td colspan="4">No hay usuarios.</td></tr>';
        return;
    }

    data.usuarios.forEach(u => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${u.dni}</td>
            <td>${u.nombreCompleto}</td>
            <td>${u.nombre}</td>
            <td class="acciones">
                ${!u.is_admin
                    ? `<button class="btn-eliminar" onclick="eliminarUsuario('${u.dni}')">Eliminar</button>`
                    : '<span class="tag-admin">Admin</span>'}
            </td>
        `;
        tbody.appendChild(tr);
    });
}

async function eliminarUsuario(dni) {
    if (!confirm('¿Seguro que querés eliminar este usuario?')) return;
    const respuesta = await fetch(`http://localhost:4000/admin/usuarios/${dni}`, { method: 'DELETE' });
    const data = await respuesta.json();
    mostrarMensaje('mensaje-usuarios', data.mensaje, respuesta.ok);
    cargarUsuarios();
}
//PARTIDAS

async function cargarPartidas() {
    const respuesta = await fetch('http://localhost:4000/admin/partidas');
    const data = await respuesta.json();
    const tbody = document.getElementById('tabla-partidas');
    tbody.innerHTML = '';

    if (!data.partidas || data.partidas.length === 0) {
        tbody.innerHTML = '<tr><td colspan="7">No hay partidas registradas.</td></tr>';
        return;
    }

    data.partidas.forEach(p => {
        const fecha = new Date(p.momento).toLocaleDateString('es-AR');
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${p.id}</td>
            <td>${p.usuario}</td>
            <td>${p.puntaje}</td>
            <td>${p.rondas}</td>
            <td>${p.fallidas}</td>
            <td>${fecha}</td>
            <td class="acciones">
                <button class="btn-eliminar" onclick="eliminarPartida(${p.id})">Eliminar</button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

async function eliminarPartida(id) {
    if (!confirm('¿Seguro que querés eliminar esta partida?')) return;
    const respuesta = await fetch(`http://localhost:4000/admin/partidas/${id}`, { method: 'DELETE' });
    const data = await respuesta.json();
    mostrarMensaje('mensaje-partidas', data.mensaje, respuesta.ok);
    cargarPartidas();
}

//UTILIDADES

function mostrarMensaje(idElemento, texto, esOk) {
    const el = document.getElementById(idElemento);
    el.textContent = texto;
    el.className = 'mensaje ' + (esOk ? 'ok' : 'error');
    setTimeout(() => { el.textContent = ''; el.className = 'mensaje'; }, 3000);
}

function escapar(str) {
    return String(str).replace(/'/g, "\\'").replace(/"/g, '&quot;');
}