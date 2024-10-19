import axios from 'axios';
import jwt from 'jsonwebtoken';
import Apprentice from '../models/apprentice.js';

const REP_FORA = process.env.REP_FORA;

const validate = {
    validateRepfora: async (req, res, next) => {
        const { token } = req.headers;
    
        console.log("Token Capturado:", token);
    
        if (!token) {
            return res.status(401).json({
                msg: 'Token no proveído'
            });
        }
    
        try {
            const validate = await axios.post(`${REP_FORA}/api/users/token/productive/stages`, null, {
                headers: { token: token }
            });
    
            console.log("Respuesta del Api:", validate.data);
    
            if (validate.data.token === true) {
                console.log('Validación correcta:', validate.data);
                
        
                req.userData = validate.data;
    
                return next();
            } else {
                return res.status(400).json({
                    msg: 'Token inválido',
                    data: validate.data
                });
            }
        } catch (error) {
            return res.status(error.response?.status || 500).json({
                message: error.response?.data?.message || error.message,
                status: error.response?.status,
                data: error.response?.data
            });
        }
    },

    validateInstructor: async (req, res, next) => {
        const { token } = req.headers;
    
        console.log("Token Capturado:", token);
    
        if (!token) {
            return res.status(401).json({
                msg: 'Token no proveído'
            });
        }
    
        try {
            const validate = await axios.post(`${REP_FORA}/api/instructors/token/productive/stages`, null, {
                headers: { token: token }
            });
    
            console.log("Respuesta del Api:", validate.data);
    
            if (validate.data.token === true) {
                console.log('Validación correcta:', validate.data);
                
        
                req.userData = validate.data;
    
                return next();
            } else {
                return res.status(400).json({
                    msg: 'Token inválido',
                    data: validate.data
                });
            }
        } catch (error) {
            return res.status(error.response?.status || 500).json({
                message: error.response?.data?.message || error.message,
                status: error.response?.status,
                data: error.response?.data
            });
        }
    },

    generateJWT: (uid) => {
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
    },
    
    validateJWT: async (req, res, next) => {
        const token = req.header("token");
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
    }
}


export { validate };