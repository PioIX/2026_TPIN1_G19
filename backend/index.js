require('dotenv').config({ path: '.pio.env' });
const express = require('express');
const cors = require('cors');
const db = require('./modulos/mysql');

const app = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());
app.listen(port, () => console.log(`Servidor en http://localhost:${port}`));

//LOGIN

app.post('/login', async (req, res) => {
    const { usuario, contrasena } = req.body;
    if (!usuario || !contrasena)
        return res.status(400).json({ ok: false, mensaje: 'Completá usuario y contraseña.' });
    try {
        const encontrado = await db.verificarCredenciales(usuario, contrasena);
        if (!encontrado)
            return res.status(401).json({ ok: false, mensaje: 'Usuario o contraseña incorrectos. ¿No tenés cuenta? Registrate.' });
        const { cont, ...sinPassword } = encontrado;
        return res.status(200).json({ ok: true, usuario: sinPassword });
    } catch (err) {
        return res.status(500).json({ ok: false, mensaje: 'Error del servidor.' });
    }
});

//REGISTRO

app.post('/registro', async (req, res) => {
    const { dni, nombre, usuario, contrasena } = req.body;
    if (!dni || !nombre || !usuario || !contrasena)
        return res.status(400).json({ ok: false, mensaje: 'Completá todos los campos.' });
    try {
        const existe = await db.buscarUsuario(dni, usuario);
        if (existe)
            return res.status(409).json({ ok: false, mensaje: 'Ya existe una cuenta con ese DNI o usuario.' });
        await db.registrarUsuario(dni, nombre, usuario, contrasena);
        return res.status(201).json({ ok: true, mensaje: 'Cuenta creada correctamente.' });
    } catch (err) {
        return res.status(500).json({ ok: false, mensaje: 'Error del servidor.' });
    }
});

//ADMIN: JUGADORES

app.get('/admin/jugadores', async (req, res) => {
    try { return res.json({ ok: true, jugadores: await db.obtenerJugadores() }); }
    catch { return res.status(500).json({ ok: false, mensaje: 'Error al obtener jugadores.' }); }
});

app.post('/admin/jugadores', async (req, res) => {
    const { nombre, id_liga, id_pais, id_equipo, id_posicion } = req.body;
    if (!nombre || !id_liga || !id_pais || !id_equipo || !id_posicion)
        return res.status(400).json({ ok: false, mensaje: 'Completá todos los campos.' });
    try {
        await db.agregarJugador(nombre, id_liga, id_pais, id_equipo, id_posicion);
        return res.status(201).json({ ok: true, mensaje: 'Jugador agregado.' });
    } catch { return res.status(500).json({ ok: false, mensaje: 'Error al agregar jugador.' }); }
});

app.put('/admin/jugadores/:id', async (req, res) => {
    const { nombre, id_liga, id_pais, id_equipo, id_posicion } = req.body;
    if (!nombre || !id_liga || !id_pais || !id_equipo || !id_posicion)
        return res.status(400).json({ ok: false, mensaje: 'Completá todos los campos.' });
    try {
        await db.editarJugador(req.params.id, nombre, id_liga, id_pais, id_equipo, id_posicion);
        return res.json({ ok: true, mensaje: 'Jugador actualizado.' });
    } catch { return res.status(500).json({ ok: false, mensaje: 'Error al editar jugador.' }); }
});

app.delete('/admin/jugadores/:id', async (req, res) => {
    try {
        await db.eliminarJugador(req.params.id);
        return res.json({ ok: true, mensaje: 'Jugador eliminado.' });
    } catch { return res.status(500).json({ ok: false, mensaje: 'Error al eliminar jugador.' }); }
});

//ADMIN: EQUIPOS

app.get('/admin/equipos', async (req, res) => {
    try { return res.json({ ok: true, equipos: await db.obtenerEquipos() }); }
    catch { return res.status(500).json({ ok: false, mensaje: 'Error.' }); }
});

app.post('/admin/equipos', async (req, res) => {
    const { nombre } = req.body;
    if (!nombre) return res.status(400).json({ ok: false, mensaje: 'Ingresá un nombre.' });
    try {
        await db.agregarEquipo(nombre);
        return res.status(201).json({ ok: true, mensaje: 'Equipo agregado.' });
    } catch { return res.status(500).json({ ok: false, mensaje: 'Error.' }); }
});

app.delete('/admin/equipos/:id', async (req, res) => {
    try {
        await db.eliminarEquipo(req.params.id);
        return res.json({ ok: true, mensaje: 'Equipo eliminado.' });
    } catch { return res.status(500).json({ ok: false, mensaje: 'Error.' }); }
});

//ADMIN: LIGAS

app.get('/admin/ligas', async (req, res) => {
    try { return res.json({ ok: true, ligas: await db.obtenerLigas() }); }
    catch { return res.status(500).json({ ok: false, mensaje: 'Error.' }); }
});

app.post('/admin/ligas', async (req, res) => {
    const { nombre } = req.body;
    if (!nombre) return res.status(400).json({ ok: false, mensaje: 'Ingresá un nombre.' });
    try {
        await db.agregarLiga(nombre);
        return res.status(201).json({ ok: true, mensaje: 'Liga agregada.' });
    } catch { return res.status(500).json({ ok: false, mensaje: 'Error.' }); }
});

app.delete('/admin/ligas/:id', async (req, res) => {
    try {
        await db.eliminarLiga(req.params.id);
        return res.json({ ok: true, mensaje: 'Liga eliminada.' });
    } catch { return res.status(500).json({ ok: false, mensaje: 'Error.' }); }
});

//ADMIN: PAiSES

app.get('/admin/paises', async (req, res) => {
    try { return res.json({ ok: true, paises: await db.obtenerPaises() }); }
    catch { return res.status(500).json({ ok: false, mensaje: 'Error.' }); }
});

app.post('/admin/paises', async (req, res) => {
    const { nombre } = req.body;
    if (!nombre) return res.status(400).json({ ok: false, mensaje: 'Ingresá un nombre.' });
    try {
        await db.agregarPais(nombre);
        return res.status(201).json({ ok: true, mensaje: 'País agregado.' });
    } catch { return res.status(500).json({ ok: false, mensaje: 'Error.' }); }
});

app.delete('/admin/paises/:id', async (req, res) => {
    try {
        await db.eliminarPais(req.params.id);
        return res.json({ ok: true, mensaje: 'País eliminado.' });
    } catch { return res.status(500).json({ ok: false, mensaje: 'Error.' }); }
});

//ADMIN: POSICIONES

app.get('/admin/posiciones', async (req, res) => {
    try { return res.json({ ok: true, posiciones: await db.obtenerPosiciones() }); }
    catch { return res.status(500).json({ ok: false, mensaje: 'Error.' }); }
});

app.post('/admin/posiciones', async (req, res) => {
    const { nombre } = req.body;
    if (!nombre) return res.status(400).json({ ok: false, mensaje: 'Ingresá un nombre.' });
    try {
        await db.agregarPosicion(nombre);
        return res.status(201).json({ ok: true, mensaje: 'Posición agregada.' });
    } catch { return res.status(500).json({ ok: false, mensaje: 'Error.' }); }
});

app.delete('/admin/posiciones/:id', async (req, res) => {
    try {
        await db.eliminarPosicion(req.params.id);
        return res.json({ ok: true, mensaje: 'Posición eliminada.' });
    } catch { return res.status(500).json({ ok: false, mensaje: 'Error.' }); }
});

//ADMIN: USUARIOS

app.get('/admin/usuarios', async (req, res) => {
    try { return res.json({ ok: true, usuarios: await db.obtenerTodosLosUsuarios() }); }
    catch { return res.status(500).json({ ok: false, mensaje: 'Error.' }); }
});

app.delete('/admin/usuarios/:id', async (req, res) => {
    try {
        await db.eliminarUsuario(req.params.id);
        return res.json({ ok: true, mensaje: 'Usuario eliminado.' });
    } catch { return res.status(500).json({ ok: false, mensaje: 'Error.' }); }
});

//ADMIN: PARTIDAS

app.get('/admin/partidas', async (req, res) => {
    try { return res.json({ ok: true, partidas: await db.obtenerPartidas() }); }
    catch { return res.status(500).json({ ok: false, mensaje: 'Error.' }); }
});

app.delete('/admin/partidas/:id', async (req, res) => {
    try {
        await db.eliminarPartida(req.params.id);
        return res.json({ ok: true, mensaje: 'Partida eliminada.' });
    } catch { return res.status(500).json({ ok: false, mensaje: 'Error.' }); }
});