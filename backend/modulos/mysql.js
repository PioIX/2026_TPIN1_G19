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
    catch(err) {
        console.log(err);
        throw err;
    }
    finally {
        if(connection && connection.end) connection.end();
    }
    return returnObject[0];
}

// Busca si ya existe ese DNI o ese usuario en la base
exports.buscarUsuario = async function(dni, usuario) {
    const rows = await exports.realizarQuery(
        `SELECT * FROM Usuarios WHERE dni = ? OR nombre = ?`,
        [dni, usuario]
    );
    return rows.length > 0 ? rows[0] : null;
}

// Inserta un usuario nuevo
exports.registrarUsuario = async function(dni, nombre, usuario, contrasena) {
    return await exports.realizarQuery(
        `INSERT INTO Usuarios (dni, nombreCompleto, nombre, cont, is_admin) VALUES (?, ?, ?, ?, FALSE)`,
        [dni, nombre, usuario, contrasena]
    );
}

// Verifica las credenciales del login
exports.verificarCredenciales = async function(usuario, contrasena) {
    const rows = await exports.realizarQuery(
        `SELECT * FROM Usuarios WHERE nombre = ? AND cont = ?`,
        [usuario, contrasena]
    );
    return rows.length > 0 ? rows[0] : null;
}