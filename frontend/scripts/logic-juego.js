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
