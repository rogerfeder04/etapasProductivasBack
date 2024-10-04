import Apprentice from '../models/apprentice.js';
import Register from '../models/register.js';

const httpApprentices = {
    //Listar Aprendicrs
    listApprentices: async (req, res) => {
        try {
            const apprentices = await Apprentice.find();
            res.json({ apprentices });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }

    },

    //Listar Aprendices por Ficha
    listApprenticesByFiche: async (req, res) => {
        const { idfiche } = req.params;
        try {
            const apprentices = await Apprentice.find({ "fiche.idFiche": idfiche });
            res.json({ apprentices });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    //Listar Aprendices por ID
    listApprenticesByID: async (req, res) => {
        const { id } = req.params;
        try {
            const apprentices = await Apprentice.findById(id);
            if (!apprentices) {
                return res.status(404).json({ message: 'Aprendiz no encontrado' });
            }
            res.json(apprentices);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    //Listar aprendices por estado
    listApprenticeByStatus: async (req, res) => {
        const { status } = req.params;
        try {
            if (status !== '0' && status !== '1') {
                return res.status(404).json({ message: 'Estado invalido' });
            } else if (status == 1) {
                const activatedApprentices = await Apprentice.find({ status: 1 });
                res.json({ activatedApprentices });
            } else {
                const disabledApprentices = await Apprentice.find({ status: 0 });
                res.json({ disabledApprentices });
            }
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    //Crear Aprendiz y pre-registro
    addApprenticenPreregister: async (req, res) => {
        const { fiche, tpDocument, numDocument, firstName, lastName, phone, email, modality } = req.body;
        
        try {
            const newApprentice = new Apprentice({ fiche, tpDocument, numDocument, firstName, lastName, phone, email });
            const apprenticeCreated = await newApprentice.save();

            const newRegister = new Register({
                idApprentice: apprenticeCreated._id,
                idModality: modality
            });


            const preRegisterCreated = await newRegister.save();

            res.status(201).json({
                apprentice: apprenticeCreated,
                register: preRegisterCreated
            });
            console.log("Aprendiz y pre-registro guardados exitosamente");
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },
    // Editar un aprendiz por su ID
    updateApprenticeByID: async (req, res) => {
        const { id } = req.params;
        const { fiche, tpDocument, numDocument, firstName, lastName, phone, email } = req.body;
        try {
            const aprendizID = await Apprentice.findById(id);
            if (!aprendizID) {
                return res.status(404).json({ error: 'No se ha encontrado al aprendiz' });
            }

            const editAprendiz = await Apprentice.findByIdAndUpdate(id, { fiche, tpDocument, numDocument, firstName, lastName, phone, email }, { new: true });

            console.log('Aprendiz editado:', editAprendiz);
            res.json(editAprendiz);
        } catch (error) {
            console.error('Error al editar aprendiz:', error);
            res.status(500).json({ error: 'Error al editar el aprendiz' });
        }
    },
    //inactivar Aprendiz
    disableApprentice: async (req, res) => {
        const { id } = req.params;
        try {
            const aprendiz = await Apprentice.findByIdAndUpdate(id, { estado: 0 }, { new: true });
            if (!aprendiz) {
                return res.status(404).json({ message: 'Aprendiz no encontrado' });
            }
            res.json(aprendiz);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    //activar Aprendiz
    enableApprencice: async (req, res) => {
        const { id } = req.params;
        try {
            const aprendiz = await Apprentice.findByIdAndUpdate(id, { estado: 1 }, { new: true });
            if (!aprendiz) {
                return res.status(404).json({ message: 'Aprendiz no encontrado' });
            }
            res.json(aprendiz);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
};

export default httpApprentices