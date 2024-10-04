// import AuthService from '../services/authService.js';

// export const ficheHelper = {
//   existsFicheID: async (ficheId) => {
//     try {
//       const fiche = await AuthService.AutheticatedRequest('get', `/api/fiches/${ficheId}`);
//       if (!fiche) {
//         throw new Error(`La ficha con ID ${ficheId} no existe en la API externa.`);
//       }
//       return true;
//     } catch (error) {
//       throw new Error(`Error al verificar la ficha: ${error.message}`);
//     }
//   }
// };

// export default ficheHelper
import axios from 'axios';

const REP_FORA = process.env.REP_FORA;

export const ficheHelper = {
  existsFicheID: async (idFiche, token) =>  {
      if (!token) {
        throw new Error("Token es obligatorio");
      }
      if (!idFiche) {
        throw new Error("ID de ficha es obligatorio");
      }
      try {
        const response = await axios.get(`${process.env.REP_FORA}/api/fiches/${idFiche}`, { 
          headers: { token } 
        });
  
        if (!response.data || !response.data._id) {
          throw new Error("ID de ficha no encontrado");
        }
        return response.data; 
      } catch (error) {
        throw new Error(error.response?.data?.message || 'Error al verificar la ficha: ' + error.message);
      }
    }}

export default ficheHelper