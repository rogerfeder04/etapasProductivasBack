import axios from 'axios';
import 'dotenv/config';

const REP_FORA = process.env.REP_FORA

const validateRepfora = async (req, res) => {
    const { token } = req.headers;  // Obtener el token de los headers

    // Mostrar el token en consola para depuración
    console.log(token);

    // Verificar si el token está presente
    if (!token) {
        return res.status(401).json({
            msg: 'Token no proveído'
        });
    }

    try {
        // Realizar la solicitud POST a la API, enviando el token en los headers
        const validate = await axios.post(`${REP_FORA}/api/users/token/productive/stages`, {}, {
            headers: {
                Authorization: `Bearer ${token}`  // Enviar el token en los headers
            }
        });

        // Mostrar la respuesta de la validación
        console.log(validate.data);
        
        // Verificar si el token es válido en la respuesta de la API 
        
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
        // Manejar errores de la solicitud
        return res.status(error.response?.status || 500).json({
            message: error.response?.data?.message || error.message,
            status: error.response?.status,
            data: error.response?.data
        });
    }
};


export { validateRepfora };