import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'correo',
        pass: 'clave de app generada'
    }
});

const sendMail = async (destinatario, asunto, texto) => {
    try {
        const info = await transporter.sendMail({
            from: 'correo',
            to: destinatario,
            subject: asunto,
            text: texto
        });

        console.log('Correo enviado:', info.response);
    } catch (error) {
        console.error('Error al enviar el correo:', error);
    }
};

export default sendMail