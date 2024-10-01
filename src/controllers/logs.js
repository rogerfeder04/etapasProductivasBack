import Log from '../models/logs.js';



const httpLog = {

        // GET: Listar todos los logs
    listLogs: async (req, res) => {
        try {
            const logs = await Followup.find();
            res.json({ logs });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

     // GET: Obtener logs por su ID
    listById: async (req, res) => {
        try {
            const logs = await Log.findById(req.params.id);
            if (logs) {
                res.json(logs);
            } else {
                res.status(404).json({ message: 'log no encontrado' });
            }
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    

    // POST: Añadir log
    addLog: async (req, res) => {
        const {users, action, information, data} = req.body;
         try {
        const log = new Log({users, action, information, data});
        await log.save();
        res.json({ log });
         } catch (error) {
        res.status(400).json({ error: error.message });
         }
        },

    // PUT: Modificar aprendiz
    updateLog: async (req, res) => {
        const { id } = req.params;
    const { users, action, information, data } = req.body;
    try {
        const log = await Log.findByIdAndUpdate(id, { users, action, information, data }, { new: true });
        res.json({ log });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
},

    // PUT: Activar Aprendiz
    enableLog: async (req, res) => {
        const { id } = req.params;
        try {
            await Log.findByIdAndUpdate(id, { estado: 1 });
            res.json({ msg: "Log activado correctamente" });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

     // PUT: Desactivar Aprendiz
     disableLog: async (req, res) => {
        const { id } = req.params;
        try {
            await Log.findByIdAndUpdate(id, { estado: 0 });
            res.json({ msg: "Log desactivado correctamente" });
            } catch (error) {
                res.status(500).json({ error: error.message }); 
            }
        },


        
        
            }

export default httpLog;