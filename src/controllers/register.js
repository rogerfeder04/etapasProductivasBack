import Register from '../models/register.js';
import Apprentice from '../models/apprentice.js';
import Modality from '../models/modality.js';
import bcryptjs from 'bcryptjs';


const httpRegisters = {
    // Listar todos los registros
    listAllRegister: async (req, res) => {
        try {
            const register = await Register.find();
            res.json({ register });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // Listar un registro por su ID
    listRegisterById: async (req, res) => {
        const { id } = req.params;
        try {
            const register = await Register.findById(id);
            if (register)
                res.json({ register });
            else
                res.status(404).json({ msg: "Registro no encontrado" });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // Listar registro por el ID del aprendiz
    listRegisterByApprentice: async (req, res) => {
        const { idApprentice } = req.params;
        try {
            const apprentices = await Apprentice.find({ idApprentice: idApprentice });
            res.json(apprentices);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    // Listar registros por ID de ficha:
    listRegistersByFiche: async (req, res) => {
        try {
            const { idFiche } = req.params;  // idFiche por parámetro

            // Busca todos los registros cuyo aprendiz tenga el idFiche dado
            const registers = await Register.find()
                .populate({
                    path: 'idApprentice',  // Poblamos el aprendiz
                    match: { idFiche },    // Solo aquellos que coinciden con el idFiche
                });

            // Filtra los registros donde se haya poblado un aprendiz
            const filteredRegisters = registers.filter(reg => reg.idApprentice !== null);

            res.json(filteredRegisters);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    //segunda opcion:
    // listRegistersByFiche:async (req, res) => {
    //     try {
    //         const { IdFicha } = req.params;
    //         let array = [];

    //         // Consulta los registros con el aprendiz y su ficha poblados
    //         const registers = await Register.find().populate('idApprentice');

    //         // Itera sobre cada registro para filtrar por IdFicha
    //         for (let i = 0; i < registers.length; i++) {
    //             const register = registers[i];
    //             const apprenticeFicha = register?.idApprentice?.IdFicha;

    //             if (apprenticeFicha && apprenticeFicha.equals(IdFicha)) {
    //                 array.push(register);
    //             }
    //         }

    //         console.log(`Lista de registros para la ficha ${IdFicha}:`, array);
    //         res.json(array);
    //     } catch (error) {
    //         console.error(`Error al listar los registros para la ficha ${IdFicha}:`, error);
    //         res.status(500).json({ message: error.message });
    //     }
    // },

    // Listar registros por ID de modalidad
    listRegisterByModality: async (req, res) => {
        try {
            const { idModality } = req.params;  //  idModality por parámetro

            const registers = await Register.find({ idModality });

            if (registers.length > 0) {
                res.json(registers);
            } else {
                res.status(404).json({ msg: "No se encontraron registros para esta modalidad" });
            }
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // Listar los registros por fecha de inicio 
    listRegisterByStartDate: async (req, res) => {
        const { startDate } = req.query; // Obtén el valor de StartDate desde los parámetros de consulta

        if (!startDate) {
            return res.status(400).json({ message: 'El parámetro StartDate es requerido' });
        }

        try {
            const register = await Register.find({ StartDate: startDate });
            res.status(200).json(register);
        } catch (error) {
            console.error('Error al listar los registros por fecha de inicio:', error);
            res.status(500).json({ message: 'Error al listar los registros' });
        }
    },


    // Listar los registros por fecha de finalización
    listRegisterByEndDate: async (req, res) => {
        const { endDate } = req.query; // Obtén el valor de StartDate desde los parámetros de consulta

        if (!endDate) {
            return res.status(400).json({ message: 'El parámetro StarDate es requerido' });
        }

        try {
            const register = await Register.find({ EndDate: endDate });
            res.status(200).json(register);
        } catch (error) {
            console.error('Error al listar los registros por fecha de finalizacion:', error);
            res.status(500).json({ message: 'Error al listar los registros' });
        }
    },

    // Añadir  Registro:
    addRegister: async (req, res) => {
        const { idApprentice, idModality, startDate, endDate, lastName, company, phoneCompany, addressCompany, owner, docAlternative, hour, mailCompany } = req.body;
        try {
            const newRegister = new Register({ idApprentice, idModality, startDate, endDate, lastName, company, phoneCompany, addressCompany, owner, docAlternative, hour, mailCompany });
            const RegisterCreate = await newRegister.save();
            res.status(201).json(RegisterCreate);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },
    // Actualizar los datos del registro 
    updateRegisterById: async (req, res) => {
        const { id } = req.params;  // ID del registro a actualizar
        const { idApprentice, idModality, startDate, endDate, lastName, company, phoneCompany, addressCompany, owner, docAlternative, hour, mailCompany } = req.body;

        try {
            // Buscar el registro por ID y actualizarlo con los datos del cuerpo de la solicitud
            const updatedRegister = await Register.findByIdAndUpdate(
                id,
                {
                    idApprentice,
                    idModality,
                    startDate,
                    endDate,
                    lastName,
                    company,
                    phoneCompany,
                    addressCompany,
                    owner,
                    docAlternative,
                    hour,
                    mailCompany
                },
                { new: true }  // Opción para devolver el documento actualizado
            );

            if (!updatedRegister) {
                return res.status(404).json({ msg: "Registro no encontrado" });
            }
            // Responde con el registro actualizado
            res.json(updatedRegister);
        } catch (error) {
            // Captura errores y responde con un mensaje
            res.status(400).json({ message: error.message });
        }
    },

    // Activar un registro
    enableRegister: async (req, res) => {
        const { id } = req.params;
        try {
            await Register.findByIdAndUpdate(id, { estado: 1 });
            res.json({ msg: "Registro activado correctamente" });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // Desactivar un registro
    disableDesactivateRegister: async (req, res) => {
        const { id } = req.params;
        try {
            await Register.findByIdAndUpdate(id, { estado: 0 });
            res.json({ msg: "Registro desactivado correctamente" });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    updateRegisterModality: async (req, res) => {
    }

};

export default httpRegisters