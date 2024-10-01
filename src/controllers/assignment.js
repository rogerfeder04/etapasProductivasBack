import Assignment from "../models/assignment.js";
import sendMail from "../utils/mailer.js";
// import User from "../models/userEP.js";
import Register from "../models/register.js";

const httpAssignmets = {
  //Listar todas las Asignaciones
  listAllAssignments: async (req, res) => {
    try {
      const assignments = await Assignment.find();
      res.json(assignments);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  //Listar asignacion por su ID
  listAssignmentsByID: async (req, res) => {
    const { id } = req.params;
    try {
      const assignments = await Assignment.findById(id);
      if (!assignments) {
        return res.status(404).json({ message: "Asignacion no encontrada" });
      }
      res.json(assignments);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  //Listar por ID de registros
  listAssignmentsByRegister: async (req, res) => {
    const { idRegister } = req.params;
    try {
      const assignments = await Assignment.findById({ register: idRegister });
      res.json(assignments);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // Listar por ID del instructor de seguimiento
  listAssignmentsByFollowupInstructor: async (req, res) => {
    const { idInstructor } = req.params;
    try {
      const assignments = await Assignment.find({
        followupInstructor: idInstructor,
      });
      if (assignments.length === 0) {
        return res
          .status(404)
          .json({
            message:
              "No se encontraron asignaciones para el instructor de seguimiento proporcionado",
          });
      }
      res.json(assignments);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // Listar por ID del instructor técnico
  listAssignmentsByTechnicalInstructor: async (req, res) => {
    const { idInstructor } = req.params;
    try {
      const assignments = await Assignment.find({
        technicalInstructor: idInstructor,
      });
      if (assignments.length === 0) {
        return res
          .status(404)
          .json({
            message:
              "No se encontraron asignaciones para el instructor técnico proporcionado",
          });
      }
      res.json(assignments);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // Listar por ID del instructor de proyecto
  listAssignmentsByProjectInstructor: async (req, res) => {
    const { idInstructor } = req.params;
    try {
      const assignments = await Assignment.find({
        projectInstructor: idInstructor,
      });
      if (assignments.length === 0) {
        return res
          .status(404)
          .json({
            message:
              "No se encontraron asignaciones para el instructor de proyecto proporcionado",
          });
      }
      res.json(assignments);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // Insertar Asignación
  // addAssignment: async (req, res) => {
  //     const newAssignment = new Assignment(req.body);
  //     try {
  //         const savedAssignment = await newAssignment.save();
  //         res.status(201).json(savedAssignment);
  //     } catch (error) {
  //         res.status(400).json({ message: error.message });
  //     }
  // },
  addAssignment: async (req, res) => {
    const newAssignment = new Assignment(req.body);

    try {
      // Guardar el nuevo Assignment
      const savedAssignment = await newAssignment.save();

      // Obtener el registro que incluye el aprendiz (usando req.body para identificar el registro)
      const register = await Register.findById(req.body.idRegister) // Suponiendo que la asignación tiene un idRegister en el body
        .populate("idApprentice", "email nombre"); // Popular para obtener el email y nombre del aprendiz

      if (!register) {
        return res
          .status(404)
          .json({ message: "Registro de aprendiz no encontrado" });
      }

      // Acceder al correo y nombre del aprendiz
      const apprenticeEmail = register.idApprentice.email;
      const apprenticeName = register.idApprentice.nombre;

      // Obtener correos electrónicos de los instructores
      const instructors = await Instructor.find({}, "email"); // Encuentra todos los instructores y trae solo el campo 'email'
      const instructorEmails = instructors.map(
        (instructor) => instructor.email
      ); // Mapear los correos de los instructores

      const users = await User.find({}, "email"); // Encuentra todos los usuarios y trae solo el campo 'email'
      const userEmails = users.map((user) => user.email); // Mapear los correos de los usuarios

      // Enviar correo al aprendiz
      const asunto = "Nueva Asignación";
      const texto = `Hola ${apprenticeName}, tienes una nueva asignación: ${savedAssignment.title}.`;

      // Enviar el primer correo a los usuarios
      const asuntoUsuarios = "Nuevo Assignment Asignado";
      const textoUsuarios = `Se ha creado un nuevo assignment con el título: ${savedAssignment.title}.`;
      await sendMail(userEmails, asuntoUsuarios, textoUsuarios); // Enviar correo a los usuarios

      // Enviar el segundo correo a los instructores
      const asuntoInstructores = "Notificación para Instructores";
      const textoInstructores = `Un nuevo assignment ha sido creado y está disponible para revisión. Título: ${savedAssignment.title}.`;
      await sendMail(instructorEmails, asuntoInstructores, textoInstructores); // Enviar correo a los instructores

      await sendMail(apprenticeEmail, asunto, texto);

      // Devolver la respuesta con el Assignment creado
      res.status(201).json(savedAssignment);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  // Actualizar los datos de una asignación
  updateAssignmentByID: async (req, res) => {
    const { id } = req.params;
    try {
      const updatedAssignment = await Assignment.findByIdAndUpdate(
        id,
        req.body,
        { new: true }
      );
      if (!updatedAssignment) {
        return res.status(404).json({ message: "Asignación no encontrada" });
      }
      res.json(updatedAssignment);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  // Activar una asignación
  enableAssignmentByID: async (req, res) => {
    const { id } = req.params;
    try {
      const updatedAssignment = await Assignment.findByIdAndUpdate(
        id,
        { active: true },
        { new: true }
      );
      if (!updatedAssignment) {
        return res.status(404).json({ message: "Asignación no encontrada" });
      }
      res.json(updatedAssignment);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  // Desactivar una asignación
  disableAssignmentByID: async (req, res) => {
    const { id } = req.params;
    try {
      const updatedAssignment = await Assignment.findByIdAndUpdate(
        id,
        { active: false },
        { new: true }
      );
      if (!updatedAssignment) {
        return res.status(404).json({ message: "Asignación no encontrada" });
      }
      res.json(updatedAssignment);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },
};

export default httpAssignmets;
