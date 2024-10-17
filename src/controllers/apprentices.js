import Apprentice from '../models/apprentice.js';
import Register from '../models/register.js';
import readline from 'readline';
import { Readable } from 'stream';

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
    // Crear Aprendiz y pre-registro
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
    // addApprenticenPreregister: async (req, res) => {
    //     const { fiche, tpDocument, numDocument, firstName, lastName, phone, email } = req.body;

    //     try {
    //         const newApprentice = new Apprentice({ fiche, tpDocument, numDocument, firstName, lastName, phone, email });
    //         const apprenticeCreated = await newApprentice.save();

    //         res.status(201).json({
    //             apprentice: apprenticeCreated,
    //         });
    //         console.log("Aprendiz y pre-registro guardados exitosamente");
    //     } catch (error) {
    //         res.status(400).json({ message: error.message });
    //     }
    // },

    //Añadir aprendices por archivo plano
    createApprenticesCSV: async (file) => {
        const results = [];

        const readable = new Readable();
        readable._read = () => {};
        readable.push(file.buffer);
        readable.push(null);

        const rl = readline.createInterface({
            input: readable,
            crlfDelay: Infinity,
        });

        for await (const line of rl) {
            const data = line.split(','); // Asegúrate de que esto coincida con el delimitador de tu CSV

            // Verificar que la línea contenga suficientes datos
            if (data.length < 8) {
                console.error('Error: Datos faltantes en la línea:', line);
                continue; // Omite esta línea si no hay suficientes datos
            }

            const [fiche, tpDocument, numDocument, firstName, lastName, phone, email, modality] = data;

            // Validar que todos los campos requeridos estén presentes
            if (!tpDocument || !numDocument || !firstName || !lastName || !phone || !email || !modality) {
                console.error('Error: Datos faltantes en la línea:', line);
                continue; // Omite esta línea y continúa
            }

            try {
                // Crear un nuevo aprendiz
                const newApprentice = new Apprentice({ fiche, tpDocument, numDocument, firstName, lastName, phone, email });
                const apprenticeCreated = await newApprentice.save();

                // Crear un nuevo registro asociado al aprendiz
                const newRegister = new Register({
                    idApprentice: apprenticeCreated._id,
                    idModality: modality // Usar el valor de modalidad directamente
                });

                const preRegisterCreated = await newRegister.save();

                results.push({ apprentice: apprenticeCreated, register: preRegisterCreated });
            } catch (error) {
                console.error('Error al guardar el aprendiz:', error.message);
            }
        }

        return results; // Retornar todos los registros creados
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
            const apprentice = await Apprentice.findById(id)
            if (!apprentice) {
                return res.status(404).json({ message: 'Aprendiz no encontrado' });
            } else if (apprentice.status == 0) {
                return res.status(400).json({ message: "El aprendiz ya se encuentra inactivo" });
            }
            apprentice.status = 0
            await apprentice.save();
            res.json(apprentice);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    //activar Aprendiz
    enableApprencice: async (req, res) => {
        const { id } = req.params;
        try {
            const apprentice = await Apprentice.findById(id);
            if (!apprentice) {
                return res.status(404).json({ message: 'Aprendiz no encontrado' });
            } else if (apprentice.status == 1) {
                return res.status(400).json({ message: "El aprendiz ya se encuentra activo" });
            }
            apprentice.status = 1
            await apprentice.save();
            res.json({ message: "Aprendiz activado correctamente", apprentice });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
};

export default httpApprentices