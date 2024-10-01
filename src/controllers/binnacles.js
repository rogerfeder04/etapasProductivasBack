import Binnacle from '../models/binnacles.js';


const httpBinnacles = {
    //Listar Bitacoras
    listBinnacles: async (req, res) => {
        try {
            const binnacles = await Binnacle.find();
            res.json(binnacles);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
   
    //Listar Bitacoras por ID
    listById: async (req, res) => {
        const { id } = req.params;
        try {
            const binnacles = await Binnacle.findById(id);
            if (!binnacles) {
                return res.status(404).json({ message: 'Bitacora no encontrado' });
            }
            res.json(binnacles);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },


    listarByAssignment: async (req, res) => {
        const { assignament } = req.params;
        try {
            const binnaclesAssignment = await Binnacle.find({ assignament: assignament });
            res.json(binnaclesAssignment);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    listarByInstructor: async (req, res) => {
        const { instructor } = req.params;
        try {
            const binnaclesinstructor = await Binnacle.find({ instructor: instructor });
            res.json(binnaclesinstructor);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
  
    //Crear Bitacora
    addBinnacle: async (req, res) => {
        const { assignament,instructor, number,document,status,observation,user } = req.body;
        try {
            const newBinnacle = new Apprentice({  assignament,instructor, number,document,status,observation,user});
            const BinnacleCreate = await newBinnacle.save();
            res.status(201).json(BinnacleCreate);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },
    // Editar una bitacora por su ID
    updateBinnacle: async (req, res) => {
        const { id } = req.params;
        const { assignament,instructor, number,document,status,observation,user } = req.body;
        try {
            const binnacleID = await Binnacle.findById(id);
            if (!binnacleID) {
                return res.status(404).json({ error: 'No se ha encontrado la bitacora' });
            }

            const editBinnacle = await Binnacle.findByIdAndUpdate(id, { assignament,instructor, number,document,status,observation,user  }, { new: true });

            console.log('Bitacora editada:', editBinnacle);
            res.json(editBinnacle);
        } catch (error) {
            console.error('Error al editar bitacora:', error);
            res.status(500).json({ error: 'Error al editar bitacora' });
        }
    },
    //inactivar Aprendiz
    disableBinnacle: async (req, res) => {
        const { id } = req.params;
        try {
            const binnacle = await Binnacle.findByIdAndUpdate(id, { estado: 0 }, { new: true });
            if (!binnacle) {
                return res.status(404).json({ message: 'Bitacora no encontrada' });
            }
            res.json(binnacle);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    //activar Aprendiz
    enableBinnacle: async (req, res) => {
        const { id } = req.params;
        try {
            const binnacle = await Binnacle.findByIdAndUpdate(id, { estado: 1 }, { new: true });
            if (!binnacle) {
                return res.status(404).json({ message: 'Bitacora no encontrada' });
            }
            res.json(binnacle);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
};

export default httpBinnacles