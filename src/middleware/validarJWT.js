import axios from 'axios';
import 'dotenv/config';

const REP_FORA = process.env.REP_FORA

const validateRepfora = async (req, res) => {
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
            return res.status(200).json({
                msg: 'Validación exitosa',
                data: validate.data
            });
        } else {
            return res.status(400).json({
                msg: 'Token inválido',
                data: validate.data
            });
        }
    } catch (error)  {
        return res.status(error.response?.status || 500).json({
            message: error.response?.data?.message || error.message,
            status: error.response?.status,
            data: error.response?.data
        });
    }
};


export { validateRepfora };