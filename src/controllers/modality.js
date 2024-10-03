import Modality from '../models/modality.js';
import bcryptjs from 'bcryptjs';


const httpModality = {
    // Listar todos los registros modalidad
    listallModality: async (req, res) => {
        try {
            const modality = await Modality.find();
            res.json({ modality });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
// Listar modalidad por su ID
    listModalityById: async (req, res) => {
        const { id } = req.params;
        try {
            const modality = await Modality.findById(id);
            if (modality)
                res.json({ modality });
            else
                res.status(404).json({ msg: "modalidad no encontrado" });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

// Añadir  Modalidad
    addModality: async (req, res) => {
    const {name, hourInstructorFollow, hourInstructorTechnical, hourInstructorProject } = req.body;
    try {
        const newModality = new Modality({ name, hourInstructorFollow, hourInstructorTechnical, hourInstructorProject });
        if (name=="PROYECTO PRODUCTIVO" && hourInstructorProject==32){
             
        }
        const ModalityCreate = await newModality.save();
        res.status(201).json(ModalityCreate);
        console.log(`La modalidad ${name} ha sido creada correctamente`);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
},
//Actualizar los datos de la modalidad
    updateModalityById: async (req, res) => {
        const { id } = req.params;
        const { name, hourInstructorFollow, hourInstructorTechnical, hourInstructorProject } = req.body;
        try {
            const modality = await Modality.findById(id);
            if (modality) {
                modality.name = name;
                modality.hourInstructorFollow =hourInstructorFollow;
                modality.hourInstructorTechnical = hourInstructorTechnical;
                modality.hourInstructorProject = hourInstructorProject;
                await modality.save();
                res.json({ msg: "modalidad modificado correctamente" });
            } else {
                res.status(404).json({ msg: "modalidad no encontrado" });
            }
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
//Activar una modalidad
    enableModalityById: async (req, res) => {
        const { id } = req.params;
        try {
            await Modality.findByIdAndUpdate(id, { status: 1 });
            res.json({ msg: "Modalidad activado correctamente" });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
 //Desactivar  una modalidad
    disableModalityById: async (req, res) => {
        const { id } = req.params;
        try {
            await Modality.findByIdAndUpdate(id, { status: 0 });
            res.json({ msg: "Modalidad desactivado correctamente" });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
};

export default httpModality