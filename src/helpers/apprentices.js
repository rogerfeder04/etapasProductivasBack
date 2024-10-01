import Apprentice from '../models/apprentice.js';
// import Fiche from '../models/fiches.js';

const apprenticeHelper = {
    existApprenticeID: async (id) => {
        try {
            const exist = await Apprentice.findById(id);
            if (!exist) {
                throw new Error(`El Aprendiz con ID ${id} no existe`);
            }
            return exist;
        } catch (error) {
            throw new Error(`Error al buscar el aprendiz por ID: ${error.message}`);
        }
    },

    existeFicheID: async (id, req) => {
        const existe = await Fiche.findById(id)
        if (!existe) {
            throw new Error(`no existe la ficha ${id}`)
        }

        req.req.binnaclebd = existe

    },
    
    existNumDocument: async (numDocument, method = "POST") => {
        try {
            const exist = await Apprentice.findOne({ numDocument });
            if (exist) {
                throw new Error(`Ya existe ese cc en la base de datos: ${numDocument}`);
            }
        } catch (error) {
            throw new Error(`Error al verificar cc: ${error.message}`);
        }
    },

    verifyNumDocument: async (numDocument) => {
        try {
            const exist = await Apprentice.findOne({ numDocument  });
            if (!exist) {
                throw new Error(`El cc ${numDocument} no está registrado`);
            }
            return exist;
        } catch (error) {
            throw new Error(`Error al verificar cc: ${error.message}`);
        }
    },

    existEmail: async ( email, method = "POST") => {
        try {
            const exist = await Apprentice.findOne({  email });
            if (exist) {
                throw new Error(`Ya existe ese  email en la base de datos: ${ email}`);
            }
        } catch (error) {
            throw new Error(`Error al verificar  email: ${error.message}`);
        }
    },

    verifiyEmail: async (email) => {
        try {
            const exist = await Apprentice.findOne({ email });
            if (!exist) {
                throw new Error(`El email ${email} no está registrado`);
            }
            return exist;
        } catch (error) {
            throw new Error(`Error al verificar email: ${error.message}`);
        }
    },
};

export default apprenticeHelper;