require('dotenv').config({ path: '.home.env' });
const express = require('express');
const cors = require('cors');
const db = require('./modulos/mysql');

const app = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

app.listen(port, () => console.log(`Servidor en http://localhost:${port}`));

// REGISTRO
app.post('/registro', async (req, res) => {
    const { dni, nombre, usuario, contrasena } = req.body;

    if (!dni || !nombre || !usuario || !contrasena) {
        return res.status(400).json({ ok: false, mensaje: 'Completá todos los campos.' });
    }

    try {
        const existe = await db.buscarUsuario(dni, usuario);
        if (existe) {
            return res.status(409).json({ ok: false, mensaje: 'Ya existe una cuenta con ese DNI o usuario.' });
        }

        await db.registrarUsuario(dni, nombre, usuario, contrasena);
        return res.status(201).json({ ok: true, mensaje: 'Cuenta creada correctamente.' });

    } catch (err) {
        return res.status(500).json({ ok: false, mensaje: 'Error del servidor.' });
    }
});

// LOGIN
app.post('/login', async (req, res) => {
    const { usuario, contrasena } = req.body;

    if (!usuario || !contrasena) {
        return res.status(400).json({ ok: false, mensaje: 'Completá usuario y contraseña.' });
    }

    try {
        const usuarioEncontrado = await db.verificarCredenciales(usuario, contrasena);
        if (!usuarioEncontrado) {
            return res.status(401).json({ ok: false, mensaje: 'Usuario o contraseña incorrectos.' });
        }

        const { cont, ...usuarioSinPassword } = usuarioEncontrado;
        return res.status(200).json({ ok: true, usuario: usuarioSinPassword });

    } catch (err) {
        return res.status(500).json({ ok: false, mensaje: 'Error del servidor.' });
    }
});