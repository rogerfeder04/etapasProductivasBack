import Followup from '../models/followup.js';

const httpFollowup = {
    //GET: Listar todos los Followups
    listallfollowup: async (req, res) => {
        try {
            const followups = await Followup.find();
            res.json(followups);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    //GET: Listar Followup por ID
    listfollowupbyid: async (req, res) => {
        const { id } = req.params;
        try {
            const followup = await Followup.findById(id);
            if (!followup) {
                return res.status(404).json({ message: 'Followup no encontrado' });
            }
            res.json(followup);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    //GET: Listar Followup por ID de asignación
    listfollowupbyassignment: async (req, res) => {
        const { assigment } = req.params;
        try {
            const followups = await Followup.find({ assignment: assigment });
            if (followups.length === 0) {
                return res.status(404).json({ message: 'No se encontraron followups para la asignación proporcionada' });
            }
            res.json(followups);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    //GET: Listar Followup por ID del instructor
    listfollowupbyinstructor: async (req, res) => {
        const { instructor } = req.params;
        try {
            const followups = await Followup.find({ instructor: idinstructor });
            if (followups.length === 0) {
                return res.status(404).json({ message: 'No se encontraron followups para el instructor proporcionado' });
            }
            res.json(followups);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    //POST: Insertar un Followup
    insertFollowup: async (req, res) => {
        try {
          const {
            assignment,
            instructor,
            number,
            month,
            document,
            status,
            users,
            observations
          } = req.body;
      
          // Crear un nuevo documento de seguimiento
          const newFollowup = new Followup({
            assignment,
            instructor,
            number,
            month,
            document,
            status,
            users,
            observations
          });
      
          // Guardar el documento en la base de datos
          await newFollowup.save();
      
          // Responder con el documento creado
          res.status(201).json({ message: 'Seguimiento creado exitosamente', followup: newFollowup });
      
        } catch (error) {
          res.status(500).json({ message: 'Error al crear el seguimiento', error });
        }
      },

    //PUT: Actualizar un Followup por ID
    updatefollowupbyid: async (req, res) => {
        const { id } = req.params;
        try {
            const updatedFollowup = await Followup.findByIdAndUpdate(id, req.body, { new: true });
            if (!updatedFollowup) {
                return res.status(404).json({ message: 'Followup no encontrado' });
            }
            res.json(updatedFollowup);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },

    //PUT: cambiar el estado, los valores de cada estado son:
    // Programado:1
    // Ejecutado:2
    // pendiente:3
    // Verificado:4

    updatestatus: async (req, res) => {
        const { id } = req.params;
        const { status } = req.body;

        // Verificar que el estado sea válido
        const validStatuses = [1, 2, 3, 4];
        if (!validStatuses.includes(status)) {
            return res.status(400).json({ message: 'Estado no valido' });
        }
        try {
            const updatedFollowup = await Followup.findByIdAndUpdate(
                id,
                { status },
                { new: true }
            );
            if (!updatedFollowup) {
                return res.status(404).json({ message: 'Followup no encontrado' });
            }
            res.json({ updatedFollowup });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}

export default httpFollowup;
