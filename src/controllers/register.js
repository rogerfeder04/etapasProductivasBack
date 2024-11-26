import Register from '../models/register.js';
import mongoose from 'mongoose';
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
        // if (!mongoose.isValidObjectId(idApprentice)) {
        //     return res.status(400).json({ success: false, error: 'ID de aprendiz no válido' });
        // }
        try {
            const registers = await Register.find({ idApprentice });
            console.log(`Lista de idaprendices en registros: ${idApprentice}`);
            res.json({ success: true, data: registers });
        } catch (error) {
            console.log(`Error al listar idaprendices en registros: ${idApprentice}`, error);
            res.status(500).json({ error: 'Error al listar idaprendices en registros' });
        }
    },

    // Listar registros por ID de ficha
    listRegistersByFiche: async (req, res) => {
        const { idFiche } = req.params;
        console.log(`ID de ficha recibido: ${idFiche}`);

        try {
            const registers = await Register.aggregate([
                {
                    $lookup: {
                        from: "apprentices",
                        localField: "idApprentice",
                        foreignField: "_id",
                        as: "apprentice",
                    },
                },
                {
                    $unwind: "$apprentice",
                },

                {
                    $match: {
                        "apprentice.fiche.idFiche": new mongoose.Types.ObjectId(idFiche),
                    },
                },
                {
                    $project: {
                        _id: 1,
                        ficheid: "$apprentice.fiche",
                        idApprentice: 1,
                        idModality: 1,
                        startDate: 1,
                        endDate: 1,
                        company: 1,
                        phoneCompany: 1,
                        addressCompany: 1,
                        owner: 1,
                        docAlternative: 1,
                        hour: 1,
                        businessProyectHour: 1,
                        productiveProjectHour: 1,
                        status: 1,
                        mailCompany: 1,
                    },
                },
            ]);
            console.log(`Registros encontrados: ${JSON.stringify(registers, null, 2)}`);
            res.json({ success: true, data: registers });
        } catch (error) {
            console.log(`Error al listar idfiche en register: ${idFiche}`, error);
            res.status(500).json({ error: "Error al listar idfiche en register" });
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
        const { startDate } = req.params; // Obtén el valor de StartDate desde los parámetros de consulta

        try {
            const register = await Register.find({ startDate });
            res.status(200).json(register);
        } catch (error) {
            console.error('Error al listar los registros por fecha de inicio:', error);
            res.status(500).json({ message: 'Error al listar los registros' });
        }
    },


    // Listar los registros por fecha de finalización
    listRegisterByEndDate: async (req, res) => {
        const { endDate } = req.params; // Obtén el valor de StartDate desde los parámetros de consulta

        try {
            const register = await Register.find({ endDate });
            res.status(200).json(register);
        } catch (error) {
            console.error('Error al listar los registros por fecha de finalizacion:', error);
            res.status(500).json({ message: 'Error al listar los registros' });
        }
    },

    // Añadir  Registro:
    // addRegister: async (req, res) => {
    //     const { idApprentice, idModality, startDate, company, phoneCompany, addressCompany, owner, hour, businessProyectHour, productiveProjectHour, mailCompany } = req.body;
    //     try {
    //         const start = new Date(startDate);
    //         const endDate = new Date(start);
    //         endDate.setMonth(endDate.getMonth() + 6);
    //         endDate.setDate(endDate.getDate() - 1);

    //         const newRegister = new Register({ idApprentice, idModality, startDate, endDate, company, phoneCompany, addressCompany, owner, hour, businessProyectHour, productiveProjectHour, mailCompany });
    //         const RegisterCreate = await newRegister.save();
    //         res.status(201).json(RegisterCreate);
    //     } catch (error) {
    //         res.status(400).json({ message: error.message });
    //     }
    // },
    addRegister: async (req, res) => {
        const {
            idApprentice,
            idModality,
            startDate,
            company,
            phoneCompany,
            addressCompany,
            owner,
            docAlternative,
            certificationDoc,
            mailCompany,
            judymentPhoto,
            hourProductiveStageApprentice,
            assignment
        } = req.body;

        try {
            const start = new Date(startDate);
            if (isNaN(start)) {
                return res.status(400).json({ message: "startDate no es una fecha válida" });
            }

            const modalityData = await Modality.findById(idModality);
            if (!modalityData) {
                return res.status(400).json({ message: "Modalidad no encontrada" });
            }
            const { name } = modalityData;

            const validateInstructors = (requiredInstructors) => {
                if (!assignment) return null; // Si assignment no está definido, omitir validación de instructores

                const providedInstructors = Object.keys(assignment);
                const missingInstructors = requiredInstructors.filter(instructor => !providedInstructors.includes(instructor));
                const invalidInstructors = providedInstructors.filter(instructor => !requiredInstructors.includes(instructor));

                if (missingInstructors.length > 0) {
                    return `Se requieren los instructores: ${missingInstructors.join(", ")}`;
                }
                if (invalidInstructors.length > 0) {
                    return `Instructores no permitidos: ${invalidInstructors.join(", ")}`;
                }
                return null;
            };

            let instructorError = null;
            if (name === "PROYECTO EMPRESARIAL" || name === "PROYECTO PRODUCTIVO I+D") {
                instructorError = validateInstructors(["projectInstructor", "technicalInstructor", "followupInstructor"]);
            } else if (name === "PROYECTO SOCIAL" || name === "PROYECTO PRODUCTIVO") {
                instructorError = validateInstructors(["followupInstructor", "technicalInstructor"]);
            } else if (["PASANTIA", "VÍNCULO LABORAL", "MONITORIAS", "UNIDAD PRODUCTIVA FAMILIAR", "CONTRATO DE APRENDIZAJE"].includes(name)) {
                instructorError = validateInstructors(["followupInstructor"]);
            } else {
                instructorError = validateInstructors(["followupInstructor"]);
            }

            if (instructorError) {
                return res.status(400).json({ message: instructorError });
            }

            const apprenticeCount = Array.isArray(idApprentice) ? idApprentice.length : 1;
            const singleApprenticeModalities = ["VÍNCULO LABORAL", "MONITORIAS", "PASANTIA", "UNIDAD PRODUCTIVA FAMILIAR", "CONTRATO DE APRENDIZAJE"];

            if (singleApprenticeModalities.includes(name) && apprenticeCount !== 1) {
                return res.status(400).json({ message: "Solo se permite 1 aprendiz para esta modalidad" });
            } else if (!singleApprenticeModalities.includes(name) && apprenticeCount < 1) {
                return res.status(400).json({ message: "Se requiere al menos 1 aprendiz para esta modalidad" });
            }

            const endDate = new Date(start);
            endDate.setMonth(endDate.getMonth() + 6);
            endDate.setDate(endDate.getDate() - 1);

            const newRegister = new Register({
                idApprentice,
                idModality,
                startDate,
                endDate,
                company,
                phoneCompany,
                addressCompany,
                mailCompany,
                owner,
                docAlternative,
                certificationDoc,
                judymentPhoto,
                hourProductiveStageApprentice,
                assignment
            });
            const createdRegister = await newRegister.save();
            res.status(201).json({ success: true, data: createdRegister });
        } catch (error) {
            console.error("Error al crear registro:", error);
            res.status(400).json({ message: error.message || "Error al crear el registro" });
        }
    },

    // addAssignment: async (req, res) => {
    //     const { id } = req.params;
    //     const { assignment } = req.body;

    //     try {
    //         if (!id || typeof id !== "string") {
    //             return res.status(400).json({ message: "ID inválido o no proporcionado" });
    //         }
    //         if (!assignment || typeof assignment !== "object") {
    //             return res.status(400).json({ message: "La asignación no es válida" });
    //         }

    //         // Buscar el registro en la base de datos
    //         const register = await Register.findById(id).populate('idModality');
    //         if (!register) {
    //             return res.status(404).json({ message: "Registro no encontrado" });
    //         }

    //         // Modalidades y tipos de instructores permitidos
    //         const validModalities = {
    //             "PASANTIA": ["followupInstructor"],
    //             "VINCULO LABORAL": ["followupInstructor"],
    //             "UNIDAD PRODUCTIVA FAMILIAR": ["followupInstructor"],
    //             "CONTRATO DE APRENDIZAJE": ["followupInstructor"],
    //             "PROYECTO EMPRESARIAL": ["followupInstructor", "technicalInstructor", "projectInstructor"],
    //             "PROYECTO PRODUCTIVO": ["followupInstructor", "technicalInstructor"],
    //             "PROYECTO PRODUCTIVO  I+D": ["followupInstructor", "technicalInstructor", "projectInstructor"],
    //             "PROYECTO SOCIAL": ["followupInstructor", "technicalInstructor"]
    //         };

    //         const modalityName = register.idModality.name;
    //         const allowedAssignments = validModalities[modalityName];

    //         if (!allowedAssignments) {
    //             return res.status(400).json({
    //                 message: `La modalidad "${modalityName}" no permite asignaciones.`
    //             });
    //         }

    //         // Crear o recuperar la asignación actual
    //         let currentAssignment = register.assignment.find(a => a.status === 1);

    //         if (!currentAssignment) {
    //             currentAssignment = { status: 1 };
    //             register.assignment.push(currentAssignment);
    //         }

    //         // Desactivar instructores previos en todos los roles permitidos
    //         allowedAssignments.forEach(role => {
    //             if (currentAssignment[role]) {
    //                 currentAssignment[role].forEach(instructor => {
    //                     instructor.status = 0; // Desactivar a todos los instructores previos
    //                 });
    //             }
    //         });

    //         // Procesar y actualizar instructores enviados en la solicitud
    //         allowedAssignments.forEach(role => {
    //             if (assignment[role]) {
    //                 if (!Array.isArray(assignment[role])) {
    //                     // Si hay un solo instructor, lo convertimos en arreglo
    //                     assignment[role] = [assignment[role]];
    //                 }

    //                 // Iteramos sobre los instructores, ya sea uno o varios
    //                 assignment[role].forEach(instructor => {
    //                     if (!currentAssignment[role]) {
    //                         currentAssignment[role] = []; // Inicializar si no existe
    //                     }

    //                     const existingInstructor = currentAssignment[role].find(
    //                         existing =>
    //                             existing.idInstructor &&
    //                             existing.idInstructor.toString() === instructor.idInstructor.toString()
    //                     );

    //                     if (existingInstructor) {
    //                         // Actualizar el instructor existente
    //                         existingInstructor.name = instructor.name;
    //                         existingInstructor.email = instructor.email;
    //                         existingInstructor.status = 1; // Activar el instructor
    //                     } else {
    //                         // Agregar un nuevo instructor
    //                         currentAssignment[role].push({
    //                             idInstructor: instructor.idInstructor,
    //                             name: instructor.name,
    //                             email: instructor.email,
    //                             status: 1 // Nuevo instructor activo
    //                         });
    //                     }
    //                 });
    //             }
    //         });

    //         // Guardar cambios en la base de datos
    //         await register.save();

    //         res.status(200).json({
    //             success: true,
    //             message: "Asignación actualizada correctamente",
    //             data: register
    //         });
    //     } catch (error) {
    //         console.error("Error al actualizar la asignación:", error);
    //         res.status(500).json({ message: error.message || "Error al actualizar la asignación" });
    //     }
    // },
    // addAssignment: async (req, res) => {
    //     const { id } = req.params;
    //     const { assignment } = req.body;
    //     console.log("datos asignacion recogidos " + JSON.stringify(assignment));

    //     try {
    //       const register = await Register.findById(id);
    //       if (!register) {
    //         return res.status(404).json({ message: "Registro no encontrado" });
    //       }
    //       const modalityData = await Modality.findById(register.idModality);
    //       if (!modalityData) {
    //         return res.status(400).json({ message: "Modalidad no encontrada" });
    //       }
    //       const { name } = modalityData;
    //       const validateInstructors = (requiredInstructors) => {
    //         const providedInstructors = Object.keys(assignment[0] || {}).filter(key => key !== 'status');
    //         console.log(providedInstructors);
    //         const missingInstructors = requiredInstructors.filter(instructor => !providedInstructors.includes(instructor));
    //         console.log(missingInstructors);
    //         const invalidInstructors = providedInstructors.filter(instructor => !requiredInstructors.includes(instructor));
    //         console.log(invalidInstructors);


    //         if (missingInstructors.length > 0) {
    //           return `Se requieren los instructores: ${missingInstructors.join(", ")}`;
    //         }
    //         if (invalidInstructors.length > 0) {
    //           return `Instructores no permitidos: ${invalidInstructors.join(", ")}`;
    //         }
    //         return null;
    //       };
    //       let instructorError = null;
    //       if (name === "PROYECTO EMPRESARIAL" || name === "PROYECTO PRODUCTIVO I+D") {
    //         instructorError = validateInstructors(["projectInstructor", "technicalInstructor", "followupInstructor"]);
    //       } else if (name === "PROYECTO SOCIAL" || name === "PROYECTO PRODUCTIVO") {
    //         instructorError = validateInstructors(["followupInstructor", "technicalInstructor"]);
    //       } else if (["PASANTIA", "VÍNCULO LABORAL", "MONITORIAS", "UNIDAD PRODUCTIVA FAMILIAR", "CONTRATO DE APRENDIZAJE"].includes(name)) {
    //         instructorError = validateInstructors(["followupInstructor"]);
    //       } else {
    //         instructorError = validateInstructors(["followupInstructor"]);
    //       }
    //       if (instructorError) {
    //         return res.status(400).json({ message: instructorError });
    //       }
    //       const updateInstructorStatus = (type, instructors) => {
    //         if (instructors && instructors.length > 0) {
    //           if (!Array.isArray(register.assignment)) {
    //             register.assignment = [];
    //           }
    //           if (register.assignment.length === 0) {
    //             register.assignment.push({
    //               followupInstructor: [],
    //               technicalInstructor: [],
    //               projectInstructor: [],
    //               status: 1
    //             });
    //           }
    //           const currentAssignment = register.assignment[0];
    //           currentAssignment[type] = instructors.map(instructor => ({
    //             idInstructor: instructor.idInstructor,
    //             name: instructor.name,
    //             email: instructor.email,
    //             status: instructor.status
    //           }));
    //         }
    //       };
    //       if (assignment && assignment.length > 0) {
    //         updateInstructorStatus("followupInstructor", assignment[0].followupInstructor);
    //         updateInstructorStatus("technicalInstructor", assignment[0].technicalInstructor);
    //         updateInstructorStatus("projectInstructor", assignment[0].projectInstructor);
    //         register.assignment[0].status = assignment[0].status;
    //       }
    //       await register.save();
    //       res.status(200).json({
    //         success: true,
    //         message: "Asignación actualizada correctamente",
    //         data: register
    //       });
    //     } catch (error) {
    //       console.error("Error al actualizar la asignación:", error);
    //       res.status(500).json({ message: error.message || "Error al actualizar la asignación" });
    //     }
    //   },

    addAssignment: async (req, res) => {
        const { id } = req.params;
        const { assignment } = req.body;
        try {
            console.log(`Iniciando proceso de asignación para el registro con ID: ${id}`);
            const register = await Register.findById(id);
            if (!register) {
                return res.status(404).json({ message: "Registro no encontrado" });
            }
            console.log(`Registro encontrado: ${JSON.stringify(register)}`);
            const modalityData = await Modality.findById(register.idModality);
            if (!modalityData) {
                return res.status(400).json({ message: "Modalidad no encontrada" });
            }
            const { name } = modalityData;
            console.log(`Modalidad encontrada: ${name}`);
            if (name === "PROYECTO EMPRESARIAL" || name === "PROYECTO PRODUCTIVO I+D") {
                if (!assignment[0]?.followupInstructor?.length) {
                    return res.status(400).json({ message: "El registro necesita al menos un instructor de seguimiento" });
                } else if (!assignment[0]?.technicalInstructor?.length) {
                    return res.status(400).json({ message: "El registro necesita al menos un instructor técnico" });
                } else if (!assignment[0]?.projectInstructor?.length) {
                    return res.status(400).json({ message: "El registro necesita al menos un instructor de proyecto" });
                }
            }
    
            if (!register.assignment || register.assignment.length === 0) {
                register.assignment = [{}];
            }
            if (!register.assignment[0].followupInstructor) {
                register.assignment[0].followupInstructor = [];
            }
            if (!register.assignment[0].technicalInstructor) {
                register.assignment[0].technicalInstructor = [];
            }
            if (!register.assignment[0].projectInstructor) {
                register.assignment[0].projectInstructor = [];
            }
    
            // Primero, se cambian los estados de los instructores previos a 0 (inactivos)
            const instructors = [
                ...assignment[0].followupInstructor,
                ...assignment[0].technicalInstructor,
                ...assignment[0].projectInstructor
            ];
            console.log(`Instructores a procesar: ${JSON.stringify(instructors)}`);
    
            // Iterar sobre los instructores existentes y cambiar su estado a inactivo
            const allInstructorFields = ['followupInstructor', 'technicalInstructor', 'projectInstructor'];
            allInstructorFields.forEach(field => {
                register.assignment[0][field].forEach(instructor => {
                    instructor.status = 0;  // Cambiar a inactivo
                });
            });
    
            // Guardar los cambios de los instructores existentes
            await register.save();
            console.log("Instructores previos marcados como inactivos");
    
            // Ahora, agregar los nuevos instructores y asegurarse de que estén activos
            for (let instructor of instructors) {
                const instructorId = instructor.idInstructor;
                console.log(`Procesando instructor: ${instructor.name} con ID: ${instructorId}`);
                let instructorField = null;
                if (assignment[0].followupInstructor.some(i => i.idInstructor.toString() === instructorId)) {
                    instructorField = 'followupInstructor';
                } else if (assignment[0].technicalInstructor.some(i => i.idInstructor.toString() === instructorId)) {
                    instructorField = 'technicalInstructor';
                } else if (assignment[0].projectInstructor.some(i => i.idInstructor.toString() === instructorId)) {
                    instructorField = 'projectInstructor';
                }
    
                // Agregar el nuevo instructor con el estado activo (1)
                if (instructorField) {
                    const existingInstructor = register.assignment[0][instructorField].find(i => i.idInstructor.toString() === instructorId);
                    if (!existingInstructor) {
                        register.assignment[0][instructorField].push({
                            idInstructor: instructor.idInstructor,
                            name: instructor.name,
                            email: instructor.email,
                            status: 1  // Nuevo instructor activo
                        });
                        await register.save();
                        console.log(`Nuevo instructor ${instructor.name} agregado a la asignación`);
                    } else {
                        // Si ya existe, solo actualizamos el estado a activo
                        existingInstructor.status = 1;
                        await register.save();
                        console.log(`Instructor ${instructor.name} ya estaba en la asignación, estado actualizado a activo`);
                    }
                }
            }
    
            return res.status(200).json({ message: "Asignación actualizada correctamente" });
        } catch (error) {
            console.error("Error al actualizar la asignación:", error);
            res.status(500).json({ message: error.message || "Error al actualizar la asignación" });
        }
    },    

    listAllAssignments: async (req, res) => {
        try {
            // Obtener todos los registros sin proyección para ver la estructura completa
            const registers = await Register.find({});

            // Imprimir los registros completos para ver qué datos están siendo obtenidos
            console.log("Registros completos:", registers);

            // Verificar si hay datos
            if (registers.length === 0) {
                return res.status(404).json({ success: false, message: "No se encontraron registros" });
            }

            // Filtrar los campos necesarios y poblar los instructores dentro de assignment
            const filteredRegisters = await Register.find({})
                .populate('assignment.followupInstructor', 'idInstructor name email')
                .populate('assignment.technicalInstructor', 'idInstructor name email')
                .populate('assignment.projectInstructor', 'idInstructor name email');

            console.log("Registros filtrados y poblados:", filteredRegisters);

            // Enviar la respuesta con los datos filtrados
            res.json({ success: true, data: filteredRegisters });
        } catch (error) {
            console.error("Error al listar asignaciones:", error);
            res.status(500).json({ success: false, error: "Error al listar asignaciones" });
        }
    },

    // Listar registros por ID del instructor de seguimiento
    listRegisterByFollowUpInstructor: async (req, res) => {
        const { idinstructor } = req.params;
        if (!mongoose.isValidObjectId(idinstructor)) {
            return res.status(400).json({ success: false, error: "ID de instructor no válido" });
        }
        try {
            const registers = await Register.find({
                'assignment.followupInstructor.idInstructor': idinstructor,
            });

            if (!registers.length) {
                return res.status(404).json({ success: false, message: "No se encontraron registros para este instructor" });
            }

            console.log("Registros encontrados para el instructor", registers);
            res.json({ success: true, data: registers });
        } catch (error) {
            console.error("Error al listar registros por ID de instructor de seguimiento", error);
            res.status(500).json({ success: false, error: "Error al listar registros por ID de instructor de seguimiento" });
        }
    },

    // Listar registros por ID del instructor técnico
    listRegisterByTechnicalInstructor: async (req, res) => {
        const { idinstructor } = req.params;
        if (!mongoose.isValidObjectId(idinstructor)) {
            return res.status(400).json({ success: false, error: "ID de instructor no válido" });
        }
        try {
            const registers = await Register.find({
                'assignment.technicalInstructor.idInstructor': idinstructor,
            });

            if (!registers.length) {
                return res.status(404).json({ success: false, message: "No se encontraron registros para este instructor técnico" });
            }

            console.log("Registros encontrados para el instructor técnico", registers);
            res.json({ success: true, data: registers });
        } catch (error) {
            console.error("Error al listar registros por ID de instructor técnico", error);
            res.status(500).json({ success: false, error: "Error al listar registros por ID de instructor técnico" });
        }
    },

    updateAssignment: async (req, res) => {
        const { id } = req.params;
        const { assignment } = req.body;
        try {
            const register = await Register.findById(id);
            if (!register) {
                return res.status(404).json({ message: "Registro no encontrado" });
            }
            if (!register.assignment || register.assignment.length === 0) {
                return res.status(400).json({ message: "No hay asignación para actualizar" });
            }
            const currentAssignment = register.assignment[0];
            const updateInstructorInfo = (type, updatedInstructor) => {
                if (updatedInstructor && updatedInstructor.idInstructor) {
                    const activeInstructor = currentAssignment[type].find(
                        instructor =>
                            instructor.status === 1 &&
                            instructor.idInstructor.toString() === updatedInstructor.idInstructor
                    );
                    if (activeInstructor) {
                        activeInstructor.name = updatedInstructor.name || activeInstructor.name;
                        activeInstructor.email = updatedInstructor.email || activeInstructor.email;
                    } else {
                        return false;
                    }
                }
                return true;
            };
            let updateSuccess = true;
            if (assignment) {
                if (assignment.followupInstructor) {
                    updateSuccess = updateInstructorInfo("followupInstructor", assignment.followupInstructor) && updateSuccess;
                }
                if (assignment.technicalInstructor) {
                    updateSuccess = updateInstructorInfo("technicalInstructor", assignment.technicalInstructor) && updateSuccess;
                }
                if (assignment.projectInstructor) {
                    updateSuccess = updateInstructorInfo("projectInstructor", assignment.projectInstructor) && updateSuccess;
                }
            }
            if (!updateSuccess) {
                return res.status(400).json({ message: "No se pudo actualizar uno o más instructores. Asegúrese de que estén activos." });
            }
            await register.save();
            res.status(200).json({
                success: true,
                message: "Asignación actualizada correctamente",
                data: register
            });
        } catch (error) {
            console.error("Error al actualizar la asignación:", error);
            res.status(500).json({ message: error.message || "Error al actualizar la asignación" });
        }
    },

    // Actualizar los datos del registro 
    updateRegisterById: async (req, res) => {
        const { id } = req.params;
        const { idApprentice, startDate, company, phoneCompany, addressCompany, owner, hour, businessProyectHour, productiveProjectHour, mailCompany } = req.body;
        try {
            const register = await Register.findById(id);
            if (!register) {
                return res.status(404).json({ msg: "Registro no encontrado" });
            }
            const modalityData = req.body.idModality ? await Modality.findById(req.body.idModality) : null;
            if (modalityData && !modalityData) {
                return res.status(400).json({ message: "Modalidad no encontrada" });
            }
            const modality = modalityData || register.idModality;
            const { name } = modality;

            const apprenticeCount = Array.isArray(idApprentice) ? idApprentice.length : 1;
            const singleApprenticeModalities = ["VÍNCULO LABORAL", "MONITORIAS", "PASANTIA", "UNIDAD PRODUCTIVA FAMILIAR", "CONTRATO DE APRENDIZAJE"];
            if (singleApprenticeModalities.includes(name) && apprenticeCount !== 1) {
                return res.status(400).json({ message: "Solo se permite 1 aprendiz para esta modalidad" });
            } else if (!singleApprenticeModalities.includes(name) && apprenticeCount < 1) {
                return res.status(400).json({ message: "Se requiere al menos 1 aprendiz para esta modalidad" });
            }

            let endDate = register.endDate;
            if (startDate) {
                const start = new Date(startDate);
                endDate = new Date(start);
                endDate.setMonth(endDate.getMonth() + 6);
                endDate.setDate(endDate.getDate() - 1);
            }
            const updatedRegister = await Register.findByIdAndUpdate(
                id,
                {
                    idApprentice,
                    startDate,
                    endDate,
                    company,
                    phoneCompany,
                    addressCompany,
                    owner,
                    hour,
                    businessProyectHour,
                    productiveProjectHour,
                    mailCompany
                },
                { new: true }
            );

            console.log('Registro actualizado correctamente:', updatedRegister);
            res.json({ success: true, data: updatedRegister });

        } catch (error) {
            console.error('Error al actualizar registro:', error);
            res.status(400).json({ error: 'Error al actualizar el registro' });
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
        const { id } = req.params;
        const { idModality, docAlternative } = req.body;
        try {
            const updatedModality = await Register.findByIdAndUpdate(id, { idModality, docAlternative }, { new: true });
            if (!updatedModality) {
                return res.status(404).json({ message: 'Registro no encontrado' });
            }
            res.json({ success: true, data: updatedModality });
        } catch (error) {
            console.log('Error al actualizar modalidad', error);
            res.status(500).json({ error: 'Error al actualizar modalidad' });
        }
    },

    listRegisterByFollowupInstructor: async (req, res) => {
        const { idinstructor } = req.params;
        if (!mongoose.isValidObjectId(idinstructor)) {
            return res.status(400).json({ success: false, error: "ID de instructor no válido" })
                .populate('idApprentice', 'firstName lastName fiche')
                .populate('idModality', 'name')
        }
        try {
            const registers = await Register.find({
                'assignment.followupInstructor.idInstructor': idinstructor,
            });

            if (!registers.length) {
                return res.status(404).json({ success: false, message: "No se encontraron registros para este instructor" });
            }

            console.log("Registros encontrados para el instructor", registers);
            res.json({ success: true, data: registers });
        } catch (error) {
            console.error("Error al listar registros por ID de instructor de seguimiento", error);
            res.status(500).json({ success: false, error: "Error al listar registros por ID de instructor de seguimiento" });
        }
    },

    // Listar registros por ID del instructor técnico
    listRegisterByTechnicalInstructor: async (req, res) => {
        const { idinstructor } = req.params;
        if (!mongoose.isValidObjectId(idinstructor)) {
            return res.status(400).json({ success: false, error: "ID de instructor no válido" })
                .populate('idApprentice', 'firstName lastName fiche')
                .populate('idModality', 'name')
        }
        try {
            const registers = await Register.find({
                'assignment.technicalInstructor.idInstructor': idinstructor,
            });

            if (!registers.length) {
                return res.status(404).json({ success: false, message: "No se encontraron registros para este instructor técnico" });
            }

            console.log("Registros encontrados para el instructor técnico", registers);
            res.json({ success: true, data: registers });
        } catch (error) {
            console.error("Error al listar registros por ID de instructor técnico", error);
            res.status(500).json({ success: false, error: "Error al listar registros por ID de instructor técnico" });
        }
    },

    // Listar registros por ID del instructor de Proyecto
    listRegisterByProjectInstructor: async (req, res) => {
        const { idinstructor } = req.params;
        if (!mongoose.isValidObjectId(idinstructor)) {
            return res.status(400).json({ success: false, error: "ID de instructor no válido" })
                .populate('idApprentice', 'firstName lastName fiche')
                .populate('idModality', 'name')
        }
        try {
            const registers = await Register.find({
                'assignment.projectInstructor.idInstructor': idinstructor,
            });

            if (!registers.length) {
                return res.status(404).json({ success: false, message: "No se encontraron registros para este instructor de Proyecto" });
            }

            console.log("Registros encontrados para el instructor de Proyecto", registers);
            res.json({ success: true, data: registers });
        } catch (error) {
            console.error("Error al listar registros por ID de instructor técnico", error);
            res.status(500).json({ success: false, error: "Error al listar registros por ID de instructor técnico" });
        }
    },


    // Buscar registros por ID de instructor en cualquier asignación
    listRegisterByInstructorInAssignment: async (req, res) => {
        const { idinstructor } = req.params;
        if (!mongoose.isValidObjectId(idinstructor)) {
            return res.status(400).json({ success: false, error: "ID de instructor no válido" });
        }
        try {
            const registers = await Register.find({
                $or: [
                    { 'assignment.followupInstructor.idInstructor': idinstructor },
                    { 'assignment.technicalInstructor.idInstructor': idinstructor },
                    { 'assignment.projectInstructor.idInstructor': idinstructor }
                ]
            })
                .populate('assignment.followupInstructor.idInstructor', 'name')
                .populate('assignment.technicalInstructor.idInstructor', 'name')
                .populate('assignment.projectInstructor.idInstructor', 'name')
                .populate('idApprentice', 'firstName lastName fiche')
                .populate('idModality', 'name')

            if (!registers.length) {
                return res.status(404).json({ success: false, message: "No se encontraron registros para este instructor" });
            }
            console.log("Registros encontrados para el instructor", registers);
            res.json({ success: true, data: registers });
        } catch (error) {
            console.error("Error al buscar registros por ID de instructor en asignaciones", error);
            res.status(500).json({ success: false, error: "Error al buscar registros por ID de instructor en asignaciones" });
        }
    }
};

export default httpRegisters