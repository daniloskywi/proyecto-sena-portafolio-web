require('dotenv').config();

const express    = require('express');
const nodemailer = require('nodemailer');

const app = express();
app.use(express.json());
app.use(express.static('./public'));

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

app.post('/contacto', function(req, res) {
    const nombre  = req.body.nombre;
    const email   = req.body.email;
    const mensaje = req.body.mensaje;

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
            return res.json({ ok: false });
        }
        res.json({ ok: true });
    });
});

app.listen(3000, function() {
    console.log('Servidor corriendo en http://localhost:3000');
});