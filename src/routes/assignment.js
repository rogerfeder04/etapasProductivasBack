import httpAssignments from "./../controllers/assignment.js"
import express from 'express';
import { check } from 'express-validator';
import validarCampos from "../middleware/validarCampos.js";
import  assignmentHelper  from "./../helpers/assignment.js";

const router = express.Router();

router.get('/listallassignment',[
    //validarJWT,
    validarCampos
], httpAssignments.listAllAssignments);

router.get('/listassignmentbyid/:id', [
    check('id', 'El id proporcionado no es valido').isMongoId(),
    check('id').custom(assignmentHelper.existAssignmentByID),
    //validarJWT,
    validarCampos
], httpAssignments.listAssignmentsByID);

router.get('/listassignmentbyregister/:idregister',[
    check('idregister', 'El id proporcionado no es valido').isMongoId(),
    //validarJWT,
    validarCampos
], httpAssignments.listAssignmentsByRegister);

router.get('/listassigmentbyfollowupinstructor/:idinstructor',[
    check('idinstructor', 'El id proporcionado no es valido').isMongoId(),
    //validarJWT,
    validarCampos
], httpAssignments.listAssignmentsByFollowupInstructor);

router.get('/listassigmentbytechnicalinstructor/:idinstructor',[
    check('idinstructor', 'El id proporcionado no es valido').isMongoId(),
    //validarJWT,
    validarCampos
], httpAssignments.listAssignmentsByTechnicalInstructor);

router.get('/listassigmentbyprojectinstructor/:idinstructor',[
    check('idinstructor', 'El id proporcionado no es valido').isMongoId(),
    //validarJWT,
    validarCampos
], httpAssignments.listAssignmentsByProjectInstructor);

router.post('/addassignment',[
    check('register', 'El ID de register es obligatorio').notEmpty(),
    check('register', 'El ID de register no es válido').isMongoId(),
    check('followUpInstructor', 'El ID de followUpInstructor es obligatorio').notEmpty(),
    check('followUpInstructor', 'El ID de followUpInstructor no es válido').isMongoId(),
    check('technicalInstructor', 'El ID de technicalInstructor es obligatorio').notEmpty(),
    check('technicalInstructor', 'El ID de technicalInstructor no es válido').isMongoId(),
    check('projectInstructor', 'El ID de projectInstructor es obligatorio').notEmpty(),
    check('projectInstructor', 'El ID de projectInstructor no es válido').isMongoId(),
    check('certificationDoc', 'El campo certificationDoc es obligatorio').notEmpty(),
    check('judymentPhoto', 'El campo judymentPhoto es obligatorio').notEmpty(),
    check('status', 'El campo status debe ser un numero').isInt(),
    //validarJWT,
    validarCampos
], httpAssignments.addAssignment);

router.put('/updateassignmentbyid/:id',[
    check('id', 'El id proporcionado no es valido').isMongoId(),
    //validarJWT,
    validarCampos
], httpAssignments.updateAssignmentByID);

router.put('/enableassignmentbyid/:id',[
    check('id', 'El id proporcionado no es valido'),
    //validarJWT,
    validarCampos
], httpAssignments.enableAssignmentByID);

router.put('/disableassigmentbyid/:id',[
    check('id', 'El id proporcionado no es valido'),
    validarCampos
], httpAssignments.disableAssignmentByID);

export default router;