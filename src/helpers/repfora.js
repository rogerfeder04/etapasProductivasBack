import AuthService from '../services/authService.js';

export const ficheHelper = {
  existsFicheID: async (ficheId) => {
    try {
      const fiche = await AuthService.AutheticatedRequest('get', `/api/fiches/${ficheId}`);
      if (!fiche) {
        throw new Error(`La ficha con ID ${ficheId} no existe en la API externa.`);
      }
      return true;
    } catch (error) {
      throw new Error(`Error al verificar la ficha: ${error.message}`);
    }
  }
};

export default ficheHelper