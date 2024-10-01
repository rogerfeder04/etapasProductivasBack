import jwt from 'jsonwebtoken';
// import UserEp from '../models/userEP.js';

const generarJWT = (uid) => {
    return new Promise((resolve, reject) => {
        const payload = { uid };
        jwt.sign(payload, process.env.SECRETORPRIVATEKEY, {
            expiresIn: '100y' // 100 años
        }, (err, token) => {
            if (err) {
                reject('No se pudo generar el token');
            } else {
                resolve(token);
            }
        });
    });
};

const validarJWT = async (req, res, next) => {
    const token = req.header('x-token');
    if (!token) {
        return res.status(401).json({
            msg: 'Error en la petición: Token no proporcionado'
        });
    }

    try {
        const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);
        if (!uid) {
            return res.status(401).json({
                msg: 'Error en la petición: Token inválido'
            });
        }

        const usuario = await Usuario.findById(uid);

        if (!usuario) {
            return res.status(401).json({
                msg: 'Error en la petición: Usuario no encontrado'
            });
        }

        if (usuario.estado === 0) {
            return res.status(401).json({
                msg: 'Error en la petición: Usuario inactivo'
            });
        }

        req.usuario = usuario; // Añadir el usuario a la solicitud para que esté disponible en las siguientes capas
        next();
    } catch (error) {
        res.status(401).json({
            msg: 'Token no válido'
        });
    }
};

export { generarJWT, validarJWT };