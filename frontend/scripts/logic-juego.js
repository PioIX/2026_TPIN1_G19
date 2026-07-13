const API_URL = 'http://localhost:4000';
let juego = null;
let categoriaSeleccionada = null;
let listaJugadoresCache = [];
let nombreJugadorObjetivo = null;

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

const MAPA_FOTOS = {
    'Erling Haaland': 'haaland',
    'Aleix García': 'aleixgarcia',
    'Alexander Isak': 'isak',
    'Alexandre Lacazette': 'lacazette',
    'Alexis Mac Allister': 'macallister',
    'Alisson Becker': 'alisson',
    'André Onana': 'onana',
    'Antoine Griezmann': 'griezmann',
    'Antonio Rüdiger': 'rudiger',
    'Artem Dovbyk': 'dovbyk',
    'Bart Verbruggen': 'verbruggen',
    'Bernardo Silva': 'bernardosilva',
    'Bruno Fernandes': 'brunofernandes',
    'Bruno Guimarães': 'guimaraes',
    'Bryan Cristante': 'cristante',
    'Bukayo Saka': 'saka',
    'Cole Palmer': 'palmer',
    'Corentin Tolisso': 'tolisso',
    'Cristian Romero': 'cristianromero',
    'David Raya': 'davidraya',
    'Dušan Vlahović': 'vlahovic',
    'Ederson Moraes': 'ederson',
    'Edinson Cavani': 'cavani',
    'Emiliano Martínez': 'emilianomartinez',
    'Enzo Fernández': 'enzofernandez',
    'Erling Haaland': 'haaland',
    'Folarin Balogun': 'balogun',
    'Franco Mastantuono': 'mastantuono',
    'Gabriel Rojas': 'rojas',
    'Gianluigi Donnarumma': 'donnaruma',
    'Giovanni Di Lorenzo': 'dilorenzo',
    'Guglielmo Vicario': 'vicario',
    'James Maddison': 'jamesmaddison',
    'Jan Oblak': 'oblak',
    'Jarrod Bowen': 'bowen',
    'Jude Bellingham': 'bellingham',
    'Kaoru Mitoma': 'mitoma',
    'Kylian Mbappé': 'mbappe',
    'Lautaro Martínez': 'lautaromartinez',
    'Leandro González Pírez': 'gonzalezpirez',
    'Leonardo Balerdi': 'balerdi',
    'Lisandro Martínez': 'lisandromartinez',
    'Manuel Locatelli': 'locatelli',
    'Marc- André ter Stegen': 'terstegen',
    'Marquinhos': 'marquinhos',
    'Marten de Roon': 'deroon',
    'Martin Ødegaard': 'odegaard',
    'Martín Zubimendi': 'zubimendi',
    'Mason Greenwood': 'greenwood',
    'Mike Maignan': 'maignan',
    'Mikel Oyarzabal': 'oyarzabal',
    'Mohamed Salah': 'salah',
    'Mohammed Kudus': 'kudus',
    'Nico Williams': 'nicowilliams',
    'Nicolò Barella': 'barella',
    'Ollie Watkins': 'watkins',
    'Ousmane Dembélé': 'dembele',
    'Patrick Cutrone': 'cutrone',
    'Paulo Dybala': 'dybala',
    'Pedri González': 'pedri',
    'Rafael Leão': 'leao',
    'Raphinha': 'raphinha',
    'Robert Sánchez': 'robertsanchez',
    'Rodri Hernández': 'rodri',
    'Romelu Lukaku': 'lukaku',
    'Ronald Araújo': 'araujo',
    'Rúben Dias':  'ruben',
    'Sergio Romero': 'sergioromero',
    'Theo Hernández': 'theohernandez',
    'Thibaout Courtois': 'courtois',
    'Thilo Kehrer': 'thilokehrer',
    'Unai Simón': 'unaisimon',
    'Vinícius Júnior': 'vinicius',
    'Virgil van Dijk': 'van dijk',
    'Vitinha': 'vitinha',
    'William Saliba': 'saliba',
    'Yann Sommer': 'sommer',
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
    nombreJugadorObjetivo = null;

    const consola = document.getElementById('consola');
    consola.textContent = '';
    const vacia = document.createElement('p');
    vacia.className = 'consola-vacia';
    vacia.textContent = 'Preguntá por una categoría o arriesgá el nombre cuando quieras.';
    consola.appendChild(vacia);

    document.getElementById('resultado-final').classList.add('oculto');
    document.getElementById('form-intento').classList.remove('oculto');
    document.getElementById('input-intento').value = '';
    document.getElementById('lista-jugadores').textContent = '';
    cerrarSelectorPregunta();

    const foto = document.getElementById('foto-jugador');
    foto.classList.add('oculto');
    foto.src = '';

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

async function manejarIntento(e) {
    e.preventDefault();
    if (!juego || juego.terminado) return;

    const input = document.getElementById('input-intento');
    const nombreIngresado = input.value.trim();

    if (!nombreIngresado) {
        mostrarError('Escribí un nombre.');
        return;
    }

    const jugadorEncontrado = listaJugadoresCache.find(
        j => j.nombre.trim().toLowerCase() === nombreIngresado.toLowerCase()
    );

    let acierto = false;
    let nombreMostrado = nombreIngresado;

    if (jugadorEncontrado) {
        const respuesta = await fetch(`${API_URL}/juego/intentar`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ idObjetivo: juego.idObjetivo, idIntento: jugadorEncontrado.id })
        });
        const data = await respuesta.json();
        if (!data.ok) {
            mostrarError(data.mensaje);
            return;
        }
        acierto = data.acierto;
        nombreMostrado = data.nombreIntento;
    } else {
        acierto = false;
    }

    if (acierto) {
        nombreJugadorObjetivo = nombreMostrado;
    }

    agregarEntradaConsola(acierto ? 'acierto' : 'fallo', `Intento: ${nombreMostrado}`);

    const termino = juego.agregarIntento({ acierto });

    input.value = '';
    document.getElementById('lista-jugadores').textContent = '';
    actualizarContadores();

    if (termino) {
        await finalizarPartida();
    }
}

function agregarEntradaConsola(tipo, texto) {
    const consola = document.getElementById('consola');
    const vacia = consola.querySelector('.consola-vacia');
    if (vacia) vacia.remove();

    const entrada = document.createElement('p');
    entrada.className = 'entrada entrada-' + tipo;
    entrada.textContent = texto;
    consola.appendChild(entrada);
    consola.scrollTop = consola.scrollHeight;
}

function actualizarContadores() {
    const preguntasRestantes = juego.preguntasRestantes();
    document.getElementById('contador-preguntas').textContent =
        `${preguntasRestantes} PREGUNTA${preguntasRestantes === 1 ? '' : 'S'} RESTANTE${preguntasRestantes === 1 ? '' : 'S'}`;

    const intentosRestantes = juego.intentosRestantes();
    document.querySelectorAll('#pelotas-intentos .pelota').forEach(p => {
        const n = parseInt(p.dataset.n, 10);
        p.classList.toggle('usada', n > intentosRestantes);
    });
}

async function finalizarPartida() {
    document.getElementById('form-intento').classList.add('oculto');
    document.querySelectorAll('.btn-categoria').forEach(b => b.disabled = true);
    cerrarSelectorPregunta();

    const usuario = Usuario.obtenerSesion();
    const puntaje = juego.calcularPuntaje();

    await fetch(`${API_URL}/juego/finalizar`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            dni: usuario.dni,
            puntaje,
            rondas: juego.intentos.length,
            fallidas: juego.gano ? juego.intentos.length - 1 : juego.intentos.length
        })
    });

    const mensajeFinal = document.getElementById('mensaje-final');
    if (juego.gano) {
        mensajeFinal.textContent = `¡Acertaste! Ganaste ${puntaje} puntos.`;
    } else {
        const rev = await fetch(`${API_URL}/juego/revelar/${juego.idObjetivo}`);
        const revData = await rev.json();
        nombreJugadorObjetivo = revData.nombre;
        mensajeFinal.textContent = `Perdiste. El jugador era ${revData.nombre}.`;
    }

    mostrarFotoJugador(nombreJugadorObjetivo);

    await mostrarPuntajes();
    document.getElementById('resultado-final').classList.remove('oculto');
}

function mostrarFotoJugador(nombre) {
    const foto = document.getElementById('foto-jugador');
    const archivo = MAPA_FOTOS[nombre];

    if (!archivo) {
        foto.classList.add('oculto');
        return;
    }

    foto.onerror = () => foto.classList.add('oculto');
    foto.src = `public/${archivo}.jpg`;
    foto.classList.remove('oculto');
}

async function mostrarPuntajes() {
    const respuesta = await fetch(`${API_URL}/juego/puntajes`);
    const data = await respuesta.json();

    const tabla = document.getElementById('tabla-puntajes');
    tabla.textContent = '';

    const encabezado = document.createElement('div');
    encabezado.className = 'fila-puntaje fila-puntaje-header';
    ['Jugador', 'Puntaje', 'Rondas'].forEach(t => {
        const c = document.createElement('div');
        c.textContent = t;
        encabezado.appendChild(c);
    });
    tabla.appendChild(encabezado);

    data.puntajes.forEach(p => {
        const fila = document.createElement('div');
        fila.className = 'fila-puntaje';
        [p.nombreCompleto, p.puntaje, p.rondas].forEach(valor => {
            const celda = document.createElement('div');
            celda.textContent = valor;
            fila.appendChild(celda);
        });
        tabla.appendChild(fila);
    });
}

function mostrarError(msg) {
    const el = document.getElementById('mensaje-error-intento');
    el.textContent = msg;
    setTimeout(() => el.textContent = '', 2500);
}