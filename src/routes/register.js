import httpRegisters from "../controllers/register.js"
import express from 'express';
import { check } from 'express-validator'

import validarCampos from "../middleware/validarCampos.js"
import  modalityHelper from "../helpers/modality.js";
import  apprenticeHelper from "../helpers/apprentices.js";
import  registerHelper from "../helpers/register.js";
import { ficheHelper } from "../helpers/repfora.js"


const router = express.Router();



// Listar todos los registros
router.get('/listallregister', [
    // validarJWT
], httpRegisters.listAllRegister);

// Listar un registro por su ID
router.get('/listregisterbyid/:id', [
    // validarJWT,
    check('id', 'Este campo es obligatorio').not().isEmpty(),
    check('id').custom(registerHelper.existeRegisterID),
    validarCampos
], httpRegisters.listRegisterById);


// Listar registro por el ID del aprendiz
router.get('/listregisterbyapprentice/:idapprentice', [
    // validarJWT,
    check('id', 'Este campo es obligatorio').not().isEmpty(),
    check('id').custom(apprenticeHelper.existApprenticeID),
    validarCampos
], httpRegisters.listRegisterByApprentice);

// Listar registros por ID de ficha
router.get('/listregistersbyfiche/:idfiche', [
    // validarJWT,
    check('id', 'Este campo es obligatorio').not().isEmpty(),
    check('fiche.idFiche').custom(ficheHelper.existsFicheID),
    validarCampos
], httpRegisters.listRegistersByFiche);

// Listar registros por ID de modalidad
router.get('/listregisterbymodality/:idmodality', [
    // validarJWT,
    check('id', 'Este campo es obligatorio').not().isEmpty(),
    check('id').custom(modalityHelper.existeModalityID),
    validarCampos
], httpRegisters.listRegisterByModality);

// Listar los registros por fecha de inicio 
router.get('/listregisterbystartdate', [
    // validarJWT,
    validarCampos
], httpRegisters.listRegisterByStartDate);

// Listar los registros por fecha de finalización
router.get('/listregisterbyenddate', [
    // validarJWT,
    validarCampos
   
], httpRegisters.listRegisterByEndDate);



// Añadir  Registro
// router.post('/addregister', [
//     validarJWT,
//     check('id', 'Este campo es obligatorio').not().isEmpty(),
//     check('id').custom(apprenticeHelper.existApprenticeID),
//     check('id', 'Este campo es obligatorio').not().isEmpty(),
//     check('id').custom(modalityHelper.existeModalityID),
//     check("startDate", "La fecha de inicio es obligatorio").not().isEmpty().isDate(),
//     check('endDate', "La fecha final es obligatorio").not().isEmpty().isDate(),
//     check("company", "La compañia es obligatoria").not().isEmpty(),
//     check("phoneCompany", "El telefono es obligatorio").not().isEmpty().isNumeric().isLength({ min: 10}),
//     check("addressCompany", "La direccion es obligatorio").not().isEmpty().isLength({ min: 8}),
//     check("owner", "El dueño es obligatori@").not().isEmpty(),
//     check("docAlternative", "El dueño es obligatori@").not().isEmpty().isLength({ min: 8, max: 15 }).isNumeric(),
//     check("hour", "Las horas son obligatorias").not().isEmpty().isNumeric(),
//     check("gmailCompany", "El dueño es obligatori@").not().isEmpty(),
//     validarCampos
// ], httpRegisters.addRegister);



// Actualizar los datos del registro
router.put('/updateregisterbyid/:id', [
    // validarJWT,
    check('id', 'Este campo es obligatorio').not().isEmpty(),
    check('id').custom(apprenticeHelper.existApprenticeID),
    check('id', 'Este campo es obligatorio').not().isEmpty(),
    check('id').custom(modalityHelper.existeModalityID),
    check("startDate", "La fecha de inicio es obligatorio").not().isEmpty().isDate(),
    check('endDate', "La fecha final es obligatorio").not().isEmpty().isDate(),
    check("company", "La compañia es obligatoria").not().isEmpty(),
    check("phoneCompany", "El telefono es obligatorio").not().isEmpty().isNumeric().isLength({ min: 10}),
    check("addressCompany", "La direccion es obligatorio").not().isEmpty().isLength({ min: 8}),
    check("owner", "El dueño es obligatori@").not().isEmpty(),
    check("docAlternative", "El dueño es obligatori@").not().isEmpty().isLength({ min: 8, max: 15 }).isNumeric(),
    check("hour", "Las horas son obligatorias").not().isEmpty().isNumeric(),
    check("gmailCompany", "El dueño es obligatori@").not().isEmpty(),
    validarCampos
], httpRegisters.updateRegisterById);



// Actualizar la modalidad de registro.
router.put('/updatemodalityregister/:id', [
    // validarJWT,
    check('id', 'Es mongo id').not().isEmpty(),
    check('id').custom(registerHelper.existeRegisterID),
    validarCampos
], httpRegisters.updateRegisterModality);



// Activar un registro
router.put('/enableregister/:id', [
    // validarJWT,
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
