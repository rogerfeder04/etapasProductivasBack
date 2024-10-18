import httpRegisters from "../controllers/register.js"
import express from 'express';
import { check } from 'express-validator'

import validarCampos from "../middleware/validarCampos.js"
import  modalityHelper from "../helpers/modality.js";
import  apprenticeHelper from "../helpers/apprentices.js";
import  registerHelper from "../helpers/register.js";
import { ficheHelper } from "../helpers/repfora.js"
import { validateRepfora } from "../middleware/validarJWT.js";


const router = express.Router();



// Listar todos los registros
router.get('/listallregister', [
    validateRepfora
], httpRegisters.listAllRegister);

// Listar un registro por su ID
router.get('/listregisterbyid/:id', [
    validateRepfora,
    check('id', 'Este campo es obligatorio').not().isEmpty(),
    check('id').custom(registerHelper.existeRegisterID),
    validarCampos
], httpRegisters.listRegisterById);


// Listar registro por el ID del aprendiz
router.get('/listregisterbyapprentice/:idApprentice', [
    validateRepfora,
    check('idApprentice').custom(apprenticeHelper.existApprenticeID),
    validarCampos
], httpRegisters.listRegisterByApprentice);

// Listar registros por ID de ficha
router.get('/listregistersbyfiche/:idFiche', [
    validateRepfora,
    check('idFiche').custom(async (idFiche, { req }) =>
        {await ficheHelper.existsFicheID(idFiche, req.headers.token)}),
    validarCampos
], httpRegisters.listRegistersByFiche);

// Listar registros por ID de modalidad
router.get('/listregisterbymodality/:idModality', [
    validateRepfora,
    check('idModality').custom(modalityHelper.existeModalityID),
    validarCampos
], httpRegisters.listRegisterByModality);

// Listar los registros por fecha de inicio 
router.get('/listregisterbystartdate/:startdate', [
    validateRepfora,
    validarCampos
], httpRegisters.listRegisterByStartDate);

// Listar los registros por fecha de finalización
router.get('/listregisterbyenddate/:enddate', [
    validateRepfora,
    validarCampos
], httpRegisters.listRegisterByEndDate);


router.post('/addregister', [
    validateRepfora,
    check('idApprentice', 'Este ID no es valido').isMongoId(),
    check('idApprentice', 'Este campo es obligatorio').notEmpty(),
    check('idApprentice').custom(apprenticeHelper.existApprenticeID),
    check('idModality', 'Este ID no es valido').isMongoId(),
    check('idModality', 'Este campo es obligatorio').notEmpty(),
    check('idModality').custom(modalityHelper.existeModalityID),
    check("startDate", "La fecha de inicio es obligatorio").notEmpty().isDate(),
    check("company", "La compañia es obligatoria").notEmpty(),
    check("phoneCompany", "El telefono es obligatorio").notEmpty().isNumeric().isLength({ min: 10}),
    check("addressCompany", "La direccion es obligatorio").notEmpty(),
    check("owner", "El dueño es obligatori@").notEmpty(),
    check("hour", "Las horas son obligatorias").not().isEmpty().isNumeric(),
    check("businessProyectHour", "Las horas de instruntor de proyecto empresarial son obligatorias").notEmpty().isNumeric(),
    check("productiveProjectHour", "Las horas de instructor de proyecto productivo son obligatorias").notEmpty().isNumeric(),
    check("mailCompany", "El correo de la empresa es obligatorio").notEmpty(),
    validarCampos
], httpRegisters.addRegister);



// Actualizar los datos del registro
router.put('/updateregisterbyid/:id', [
    validateRepfora,
    check('idApprentice', 'Este campo es obligatorio').optional({ nullable: true }).notEmpty(),
    check('idApprentice').optional({ nullable: true }).custom(apprenticeHelper.existApprenticeID),
    check('idModality', 'Este campo es obligatorio').optional({ nullable: true }).notEmpty(),
    check('idModality').optional({ nullable: true }).custom(modalityHelper.existeModalityID),
    check("startDate", "La fecha de inicio es obligatoria").optional({ nullable: true }).isDate(),
    check("company", "La compañía es obligatoria").optional({ nullable: true }).notEmpty(),
    check("phoneCompany", "El teléfono es obligatorio").optional({ nullable: true }).isLength({ min: 10 }),
    check("addressCompany", "La dirección es obligatoria").optional({ nullable: true }).isLength({ min: 8 }),
    check("owner", "El dueño es obligatorio").optional({ nullable: true }).notEmpty(),
    check("hour", "Las horas son obligatorias").optional({ nullable: true }).isNumeric(),
    check("businessProyectHour", "Las horas de instructor de proyecto empresarial son obligatorias").optional({ nullable: true }).isNumeric(),
    check("productiveProjectHour", "Las horas de instructor de proyecto productivo son obligatorias").optional({ nullable: true }).isNumeric(),
    check("mailCompany", "El correo de la compañía es obligatorio").optional({ nullable: true }).notEmpty(),    
    validarCampos
], httpRegisters.updateRegisterById);

// Actualizar la modalidad de registro.
router.put('/updatemodalityregister/:id', [
    validateRepfora,
    check('idModality', 'No es un ID válido').isMongoId().notEmpty(),
    check('idModality').custom(modalityHelper.existeModalityID),
    check('docAlternative', 'El documento alternativo es obligatorio').notEmpty(),
    check('docAlternative').custom(registerHelper.verifyDocAlternative),
    validarCampos
], httpRegisters.updateRegisterModality);


// Activar un registro
router.put('/enableregister/:id', [
    validateRepfora,
    check('id', 'Es mongo id').not().isEmpty(),
    check('id').custom(registerHelper.existeRegisterID),
    validarCampos
], httpRegisters.enableRegister);


// Desactivar un registro
router.put('/disabledesactivateregister/:id', [
    check('id', 'Es mongo id').not().isEmpty(),
    check('id').custom(registerHelper.existeRegisterID),
    validarCampos
], httpRegisters.disableDesactivateRegister);



export default router;
