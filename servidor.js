require('dotenv').config();

import { Resend } from 'resend';



const express = require('express');
const { Resend } = require('resend');

const app = express();
app.use(express.json());
app.use(express.static('./Public'));

const resend = new Resend('re_Zv6G2SEr_HEiD8Cb9P5rXz38iYMkzf6Yn');

app.post('/contacto', async function(req, res) {
    const nombre  = req.body.nombre;
    const email   = req.body.email;
    const mensaje = req.body.mensaje;

    try {
        await resend.emails.send({
            from:    'Portafolio <onboarding@resend.dev>',
            to:      process.env.EMAIL_USER,
            subject: `📩 Nuevo mensaje de ${nombre} - Portafolio`,
            html: `
                <h2>Nuevo mensaje desde tu portafolio</h2>
                <p><strong>Nombre:</strong> ${nombre}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Mensaje:</strong> ${mensaje}</p>
            `
        });
        res.json({ ok: true });
    } catch (err) {
        console.error('Error al enviar email:', err);
        res.json({ ok: false });
    }
});

app.listen(3000, function() {
    console.log('Servidor corriendo en http://localhost:3000');
});