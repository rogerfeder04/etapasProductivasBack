import httpModality from "../controllers/modality.js"
import express from 'express';
import { check } from 'express-validator'
import modalityHelper from "../helpers/modality.js";
import validateFields from "../middleware/validate-fields.js"
import { validateRepfora } from "../middleware/validate-admin.js"


const router = express.Router();

// Listar todos los registros modalidad

router.get('/listallmodality', [
    validateRepfora
], httpModality.listallModality);


// Listar modalidad por su ID
router.get('/listmodalitybyid/:id', [
    validateRepfora,
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(modalityHelper.existeModalityID),
], httpModality.listModalityById);


// Añadir  Modalidad
router.post('/addmodality', [
    validateRepfora,
    check("name", "El nombre es obligatorio").not().isEmpty(),
    check('hourInstructorFollow', "La hora del seguimiento del instructor debe ser un número").optional().isNumeric(),
    check("hourInstructorTechnical", "El número de horas del instructor técnico debe ser un número").optional().isNumeric(),
    check("hourInstructorProject", "El número de horas del proyecto debe ser un número").optional().isNumeric(),
    validateFields
], httpModality.addModality);



//Actualizar los datos de la modalidad
router.put('/updatemodalitybyid/:id', [
    validateRepfora,
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(modalityHelper.existeModalityID),
    check("name", "El nombre es obligatorio").not().isEmpty(),
    check('hourInstructorFollow', "La hora del seguimiento del instructor es obligatoria").isNumeric(),
    check("hourInstructorTechnical", "La contraseña es obligatoria").not().isEmpty().isNumeric(),
    check("hourInstructorProject", "La contraseña es obligatoria").not().isEmpty().isNumeric(),
    validateFields
], httpModality.updateModalityById);

//Activar una modalidad
router.put('/enablemodalitybyid/:id', [
    validateRepfora,
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(modalityHelper.existeModalityID),
    validateFields
], httpModality.enableModalityById);

//Desactivar  una modalidad
router.put('/disablemodalitybyid/:id', [
    validateRepfora,
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(modalityHelper.existeModalityID),
    validateFields
], httpModality.disableModalityById);

export default router;