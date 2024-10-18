import httpBinnacles from "../controllers/binnacles.js"
import express from 'express';
import { check } from 'express-validator';
import validateFields from "../middleware/validate-fields.js";
import binnacleHelper from "../helpers/binnacles.js"
// import {validarJWT} from "../middleware/validarJWT.js"


const router = express.Router();

router.get('/listallbinnacles',[
    // validarJWT,
    validateFields
],httpBinnacles.listBinnacles);


router.get('/listbinnaclesbyid/:id',[
    // validarJWT,
    check('id').custom(binnacleHelper.existeBinnacleID),
    validateFields
],httpBinnacles.listById);


router.get('/listbinnaclesbyassignment/:assigment', [
    // validarJWT,
    check('assigment').custom(binnacleHelper.existeAssignmentID),
    validateFields
],httpBinnacles.listarByAssignment);


router.get('/listbinnaclesbyinstructor/:instructor', [
    // validarJWT,
    check('instructor').custom(binnacleHelper.existeInstructortID),
    validateFields
],httpBinnacles.listarByInstructor);

router.post('/addbinnacles',[
    // validarJWT,
    check('instructor', 'el  instructor es obligatorio').not().isEmpty(),
    check('assignment', 'la asignacion es obligatoria').not().isEmpty(),
    check('number', 'el numero de bitacora es obligatorio').not().isEmpty(),
    check('document', 'el documento es obligatorio').not().isEmpty(),
    check('users', 'este campo es obligatorio').not().isEmpty(),
    check('assigment').custom(binnacleHelper.existeAssignmentID),
    check('assigment').custom(binnacleHelper.existeInstructortID),
    validateFields
], httpBinnacles.addBinnacle);

router.put('/updatebinnaclebyid/:id',[
    // validarJWT,
    check('instructor', 'el  instructor es obligatorio').not().isEmpty(),
    check('assignment', 'la asignacion es obligatoria').not().isEmpty(),
    check('number', 'el numero de bitacora es obligatorio').not().isEmpty(),
    check('document', 'el documento es obligatorio').not().isEmpty(),
    check('users', 'este campo es obligatorio').not().isEmpty(),
    check('id').custom(binnacleHelper.existeBinnacleID),
    check('assigment').custom(binnacleHelper.existeAssignmentID),
    // check('assigment').custom(binnacleHelper.existeInstructortID),
    validateFields
], httpBinnacles. updateBinnacle);


router.put('/enablebinnaclebyid/:id',[
    // validarJWT,
    check('id').custom(binnacleHelper.existeBinnacleID),
    validateFields
],httpBinnacles. enableBinnacle);


router.put('/disablebinnaclebyid/:id',[
    // validarJWT,
    check('id').custom(binnacleHelper.existeBinnacleID),
    validateFields
],httpBinnacles. disableBinnacle);

export default router;