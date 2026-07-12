const API_URL = 'http://localhost:4000';
let juego = null;
let categoriaSeleccionada = null;
let listaJugadoresCache = [];

const NOMBRES_CATEGORIA = {
    liga: 'Liga',
    pais: 'País',
    equipo: 'Equipo',
    posicion: 'Posición'
};

const ENDPOINT_CATEGORIA = {
    liga: `${API_URL}/admin/ligas`,
    pais: `${API_URL}/admin/paises`,
    equipo: `${API_URL}/admin/equipos`,
    posicion: `${API_URL}/admin/posiciones`
};

const CLAVE_RESPUESTA = {
    liga: 'ligas',
    pais: 'paises',
    equipo: 'equipos',
    posicion: 'posiciones'
};

document.addEventListener('DOMContentLoaded', async () => {
    const usuario = Usuario.obtenerSesion();
    if (!usuario) {
        window.location.href = 'index.html';
        return;
    }
    document.getElementById('nombre-jugador-sesion').textContent = usuario.nombreCompleto;

    await cargarListaJugadores();
    await iniciarPartida();

    document.getElementById('form-intento').addEventListener('submit', manejarIntento);
    document.getElementById('btn-jugar-de-nuevo').addEventListener('click', () => iniciarPartida());
    document.getElementById('input-intento').addEventListener('input', actualizarSugerencias);
    document.getElementById('btn-cerrar-sesion').addEventListener('click', () => {
    Usuario.cerrarSesion();
    window.location.href = 'index.html';
});

    document.querySelectorAll('.btn-categoria').forEach(boton => {
        boton.addEventListener('click', () => abrirSelectorPregunta(boton.dataset.categoria));
    });

    document.getElementById('btn-preguntar').addEventListener('click', confirmarPregunta);
    document.getElementById('btn-cancelar-pregunta').addEventListener('click', cerrarSelectorPregunta);
});

async function cargarListaJugadores() {
    const respuesta = await fetch(`${API_URL}/juego/jugadores`);
    const data = await respuesta.json();
    listaJugadoresCache = data.jugadores;
}

function actualizarSugerencias() {
    const valor = document.getElementById('input-intento').value.trim().toLowerCase();
    const datalist = document.getElementById('lista-jugadores');
    datalist.textContent = '';

    if (!valor) return;

    listaJugadoresCache
        .filter(j => j.nombre.toLowerCase().includes(valor))
        .slice(0, 8)
        .forEach(j => {
            const option = document.createElement('option');
            option.value = j.nombre;
            datalist.appendChild(option);
        });
}

async function iniciarPartida() {
    const respuesta = await fetch(`${API_URL}/juego/nuevo`);
    const data = await respuesta.json();
    if (!data.ok) {
        alert(data.mensaje);
        return;
    }
    juego = new Juego(data.idObjetivo, 3, 10);

    const consola = document.getElementById('consola');
    consola.textContent = '';
    const vacia = document.createElement('p');
    vacia.className = 'consola-vacia';
    vacia.textContent = 'Preguntá por una categoría o arriesgá el nombre cuando quieras.';
    consola.appendChild(vacia);

    document.getElementById('resultado-final').classList.add('oculto');
    document.getElementById('form-intento').classList.remove('oculto');
    document.getElementById('input-intento').value = '';
    cerrarSelectorPregunta();

    document.querySelectorAll('#pelotas-intentos .pelota').forEach(p => p.classList.remove('usada'));
    document.querySelectorAll('.btn-categoria').forEach(b => b.disabled = false);

    actualizarContadores();
}

async function abrirSelectorPregunta(categoria) {
    if (!juego || !juego.puedePreguntar()) return;

    categoriaSeleccionada = categoria;

    const respuesta = await fetch(ENDPOINT_CATEGORIA[categoria]);
    const data = await respuesta.json();
    const opciones = data[CLAVE_RESPUESTA[categoria]] || [];

    const select = document.getElementById('select-opcion');
    select.textContent = '';
    opciones.forEach(op => {
        const option = document.createElement('option');
        option.value = op.nombre;
        option.textContent = op.nombre;
        select.appendChild(option);
    });

    document.getElementById('selector-pregunta').classList.remove('oculto');
}

function cerrarSelectorPregunta() {
    categoriaSeleccionada = null;
    document.getElementById('selector-pregunta').classList.add('oculto');
}

async function confirmarPregunta() {
    if (!juego || !categoriaSeleccionada) return;

    const select = document.getElementById('select-opcion');
    const valor = select.value;
    if (!valor) return;

    const respuesta = await fetch(`${API_URL}/juego/pregunta`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ idObjetivo: juego.idObjetivo, categoria: categoriaSeleccionada, valor })
    });
    const data = await respuesta.json();
    if (!data.ok) {
        mostrarError(data.mensaje);
        return;
    }

    juego.agregarPregunta(categoriaSeleccionada, valor);
    const respuestaTexto = data.acierto ? 'Sí' : 'No';
    agregarEntradaConsola(
        data.acierto ? 'acierto' : 'fallo',
        `${NOMBRES_CATEGORIA[categoriaSeleccionada]}: ¿${valor}? → ${respuestaTexto}`
    );
    actualizarContadores();
    cerrarSelectorPregunta();

    if (juego.preguntasRestantes() === 0) {
        document.querySelectorAll('.btn-categoria').forEach(b => b.disabled = true);
    }
}
