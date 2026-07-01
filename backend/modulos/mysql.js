const mySql = require("mysql2/promise");

const SQL_CONFIGURATION_DATA = {
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USERNAME,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DB,
    port: 3306,
    charset: 'UTF8_GENERAL_CI'
}

exports.realizarQuery = async function (queryString, params = []) {
    let returnObject;
    let connection;
    try {
        connection = await mySql.createConnection(SQL_CONFIGURATION_DATA);
        returnObject = await connection.execute(queryString, params);
    }
    catch (err) {
        console.log(err);
        throw err;
    }
    finally {
        if (connection && connection.end) connection.end();
    }
    return returnObject[0];
}

exports.buscarUsuario = async function (dni, usuario) {
    const rows = await exports.realizarQuery(
        `SELECT * FROM Usuarios WHERE dni = ? OR nombre = ?`,
        [dni, usuario]
    );
    return rows.length > 0 ? rows[0] : null;
};

exports.registrarUsuario = async function (dni, nombreCompleto, usuario, contrasena) {
    return await exports.realizarQuery(
        `INSERT INTO Usuarios (dni, nombreCompleto, nombre, cont, is_admin) VALUES (?, ?, ?, ?, FALSE)`,
        [dni, nombreCompleto, usuario, contrasena]
    );
};

exports.verificarCredenciales = async function (usuario, contrasena) {
    const rows = await exports.realizarQuery(
        `SELECT * FROM Usuarios WHERE nombre = ? AND cont = ?`,
        [usuario, contrasena]
    );
    return rows.length > 0 ? rows[0] : null;
};

exports.obtenerTodosLosUsuarios = async function () {
    return await exports.realizarQuery(
        `SELECT dni, nombreCompleto, nombre, is_admin FROM Usuarios WHERE nombre != 'admin' ORDER BY nombre ASC`
    );
};

exports.eliminarUsuario = async function (dni) {
    return await exports.realizarQuery(
        `DELETE FROM Usuarios WHERE dni = ? AND is_admin = FALSE`, [dni]
    );
};

//JUGADORES

exports.obtenerJugadores = async function () {
    return await exports.realizarQuery(
        `SELECT j.id, j.nombre,
                l.nombre AS liga, p.nombre AS pais,
                e.nombre AS equipo, pos.nombre AS posicion
         FROM Jugadores j
         JOIN Ligas l ON j.id_liga = l.id
         JOIN Paises p ON j.id_pais = p.id
         JOIN Equipos e ON j.id_equipo = e.id
         JOIN Posicion pos ON j.id_posicion = pos.id
         ORDER BY j.nombre ASC`
    );
};

exports.agregarJugador = async function (nombre, id_liga, id_pais, id_equipo, id_posicion) {
    return await exports.realizarQuery(
        `INSERT INTO Jugadores (nombre, id_liga, id_pais, id_equipo, id_posicion) VALUES (?, ?, ?, ?, ?)`,
        [nombre, id_liga, id_pais, id_equipo, id_posicion]
    );
};

exports.editarJugador = async function (id, nombre, id_liga, id_pais, id_equipo, id_posicion) {
    return await exports.realizarQuery(
        `UPDATE Jugadores SET nombre = ?, id_liga = ?, id_pais = ?, id_equipo = ?, id_posicion = ? WHERE id = ?`,
        [nombre, id_liga, id_pais, id_equipo, id_posicion, id]
    );
};

exports.eliminarJugador = async function (id) {
    return await exports.realizarQuery(`DELETE FROM Jugadores WHERE id = ?`, [id]);
};

//EQUIPOS

exports.obtenerEquipos = async function () {
    return await exports.realizarQuery(`SELECT * FROM Equipos ORDER BY nombre ASC`);
};

exports.agregarEquipo = async function (nombre) {
    return await exports.realizarQuery(`INSERT INTO Equipos (nombre) VALUES (?)`, [nombre]);
};

exports.eliminarEquipo = async function (id) {
    return await exports.realizarQuery(`DELETE FROM Equipos WHERE id = ?`, [id]);
};

//LIGAS

exports.obtenerLigas = async function () {
    return await exports.realizarQuery(`SELECT * FROM Ligas ORDER BY nombre ASC`);
};

exports.agregarLiga = async function (nombre) {
    return await exports.realizarQuery(`INSERT INTO Ligas (nombre) VALUES (?)`, [nombre]);
};

exports.eliminarLiga = async function (id) {
    return await exports.realizarQuery(`DELETE FROM Ligas WHERE id = ?`, [id]);
};

//PAiSES

exports.obtenerPaises = async function () {
    return await exports.realizarQuery(`SELECT * FROM Paises ORDER BY nombre ASC`);
};

exports.agregarPais = async function (nombre) {
    return await exports.realizarQuery(`INSERT INTO Paises (nombre) VALUES (?)`, [nombre]);
};

exports.eliminarPais = async function (id) {
    return await exports.realizarQuery(`DELETE FROM Paises WHERE id = ?`, [id]);
};

//POSICIONES

exports.obtenerPosiciones = async function () {
    return await exports.realizarQuery(`SELECT * FROM Posicion ORDER BY nombre ASC`);
};

exports.agregarPosicion = async function (nombre) {
    return await exports.realizarQuery(`INSERT INTO Posicion (nombre) VALUES (?)`, [nombre]);
};

exports.eliminarPosicion = async function (id) {
    return await exports.realizarQuery(`DELETE FROM Posicion WHERE id = ?`, [id]);
};

//PARTIDAS

exports.obtenerPartidas = async function () {
    return await exports.realizarQuery(
        `SELECT p.id, u.nombre AS usuario, p.puntaje, p.rondas, p.fallidas, p.momento
         FROM Partidas p
         JOIN Usuarios u ON p.dni = u.dni
         ORDER BY p.puntaje DESC`
    );
};

exports.eliminarPartida = async function (id) {
    return await exports.realizarQuery(`DELETE FROM Partidas WHERE id = ?`, [id]);
};