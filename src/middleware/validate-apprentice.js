import jwt from 'jsonwebtoken';
import Apprentice from '../models/apprentice.js';

const generateJWT = (uid) => {
    return new Promise((resolve, reject) => {
        const payload = { uid };
        jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: "10h"
        }, (err, token) => {
            if (err) {
                reject("No se pudo generar el token");
            } else {
                resolve(token);
            }
        });
    });
};

const validateJWT = async (req, res, next) => {
    const token = req.header("oken");
    if (!token) {
        return res.status(401).json({
            msg: "Error en la petición"
        });
    }

    try {
        let apprentice;

        const { uid } = jwt.verify(token, process.env.JWT_SECRET);
        if (!uid) {
            return res.status(401).json({
                msg: "Error en la petición"
            });
        }

        apprentice = await Apprentice.findById(uid);

        if (!apprentice) {
            return res.status(401).json({
                msg: "Error en la petición! - apprentice no existe DB"
            });
        }

        if (apprentice.estado === 0) {
            return res.status(401).json({
                msg: "Token no válido!! - apprentice con estado: false"
            });
        }

        req.apprentice = apprentice; // Añadir el objeto apprentice al objeto request
        next();

    } catch (error) {
        console.error(error);
        res.status(401).json({
            msg: "Token no válido"
        });
    }
};


export { generateJWT, validateJWT };