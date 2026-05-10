
require('dotenv').config();

// Llamamos las librerias que instalamos
const express = require('express');
const mysql = require('mysql2');

// Creamos el servidor
const app = express();

// Le decimos al servidor que entienda datos en formato JSON
app.use(express.json());

// Le decimos donde estan los archivos de tu pagina web
app.use(express.static('./public'));

// Conexion con MySQL 
const conexion = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

// Ruta que recibe los datos del formulario
app.post('/contacto', function(req, res) {
    const nombre  = req.body.nombre;
    const email   = req.body.email;
    const mensaje = req.body.mensaje;

    const sql = 'INSERT INTO contacto (nombre, email, mensaje) VALUES (?, ?, ?)';

    conexion.query(sql, [nombre, email, mensaje], function(error) {
        if (error) {
            res.json({ ok: false, mensaje: 'Error al guardar' });
        } else {
            res.json({ ok: true, mensaje: 'Mensaje enviado correctamente' });
        }
    });
});

// Arrancamos el servidor en el puerto 3000
app.listen(3000, function() {
    console.log('Servidor corriendo en http://localhost:3000');
});
