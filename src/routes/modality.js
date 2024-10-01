import httpModality from "../controllers/modality.js"
import express from 'express';
import { check } from 'express-validator'


import {validarJWT }from "../middleware/validarJWT.js"
import  modalityHelper from "../helpers/modality.js";
import validarCampos from "../middleware/validarCampos.js"

const router = express.Router();

// Listar todos los registros modalidad

router.get('/listallmodality', [
    validarJWT
], httpModality.listallModality);


// Listar modalidad por su ID
router.get('/listmodalitybyid/:id', [
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(modalityHelper.existeModalityID),
], httpModality.listModalityById);


// Añadir  Modalidad
router.post('/addmodality', [
    check("name", "El nombre es obligatorio").not().isEmpty(),
    check('hourInstructorFollow', "La hora del seguimiento del instructor es obligatoria").isNumeric(),
    check("hourInstructorTechnical", "La contraseña es obligatoria").not().isEmpty().isNumeric(),
    check("hourInstructorProject", "La contraseña es obligatoria").not().isEmpty().isNumeric(),
    validarCampos
], httpModality.addModality);



//Actualizar los datos de la modalidad
router.put('/updatemodalitybyid/:id', [
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(modalityHelper.existeModalityID),
    check("name", "El nombre es obligatorio").not().isEmpty(),
    check('hourInstructorFollow', "La hora del seguimiento del instructor es obligatoria").isNumeric(),
    check("hourInstructorTechnical", "La contraseña es obligatoria").not().isEmpty().isNumeric(),
    check("hourInstructorProject", "La contraseña es obligatoria").not().isEmpty().isNumeric(),
    validarCampos
], httpModality.updateModalityById);

//Activar una modalidad
router.put('/enablemodalitybyid/:id', [
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(modalityHelper.existeModalityID),
    validarCampos
], httpModality.enableModalityById);

//Desactivar  una modalidad
router.put('/disablemodalitybyid/:id', [
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(modalityHelper.existeModalityID),
    validarCampos
], httpModality.disableModalityById);

export default router;