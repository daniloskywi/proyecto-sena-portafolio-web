require('dotenv').config();

const express = require('express');
const mysql   = require('mysql2');
const nodemailer = require('nodemailer'); // 👈 nuevo

const app = express();
app.use(express.json());
app.use(express.static('./public'));

// Conexión MySQL
const conexion = mysql.createConnection({
    host:     process.env.DB_HOST,
    user:     process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

// Configurar Nodemailer con Gmail 👈 nuevo
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

// Ruta del formulario
app.post('/contacto', function(req, res) {
    const nombre  = req.body.nombre;
    const email   = req.body.email;
    const mensaje = req.body.mensaje;

    const sql = 'INSERT INTO contacto (nombre, email, mensaje) VALUES (?, ?, ?)';

    conexion.query(sql, [nombre, email, mensaje], function(error) {
        if (error) {
            return res.json({ ok: false, mensaje: 'Error al guardar' });
        }

        // Si guardó en MySQL, ahora enviamos el email 👈 nuevo
        transporter.sendMail({
            from:    email,
            to:      process.env.EMAIL_USER,
            subject: `📩 Nuevo mensaje de ${nombre} - Portafolio`,
            html: `
                <h2>Nuevo mensaje desde tu portafolio</h2>
                <p><strong>Nombre:</strong> ${nombre}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Mensaje:</strong> ${mensaje}</p>
            `
        }, function(errEmail) {
            if (errEmail) {
                console.error('Error al enviar email:', errEmail);
                // Guardó en MySQL pero falló el email — igual respondemos ok
                return res.json({ ok: true, mensaje: 'Guardado, pero fallo el email' });
            }
            res.json({ ok: true, mensaje: 'Mensaje enviado correctamente' });
        });
    });
});

app.listen(3000, function() {
    console.log('Servidor corriendo en http://localhost:3000');
});
