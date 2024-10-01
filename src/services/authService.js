import axios from 'axios';
import 'dotenv/config';

const REP_FORA = process.env.REP_FORA

class Authetication {
    constructor() {
        this.token = null;
    }

    setToken(token) {
        this.token = token;
    }

    getToken() {
        return this.token;
    }

    async login(email, password, role) {
        try {
            const response = await axios.post(`${REP_FORA}/api/users/login`, { email, password, role });
            this.setToken(response.data.token);
            return response.data.token;
        } catch (error) {
            console.error('Error en el login:', error.message);
            throw error;
        }
    }

    async AutheticatedRequest(method, url, data = null) {
        if (!this.token) {
            throw new Error('No hay token de autenticion');
        }
        try {
            const config = {
                method,
                url: `${REP_FORA}${url}`,
                headers: {
                    token: this.token
                },
                data
            }
            const response = await axios(config);
            return response.data;
        } catch (error) {
            console.error('Error en la petición:', error.message);
            throw error;
        }
    }
}

export default new Authetication();

