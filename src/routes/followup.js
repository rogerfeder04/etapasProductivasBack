import express from 'express';
import httpFollowup  from "./../controllers/followup.js";
import { check } from 'express-validator';
import validateFields from "../middleware/validate-fields.js";
//import { followupHelper } from "./../helpers/followup.js";
//const { validarJWT } = require("../middlewares/validarJWT.js");

const router = express.Router();

router.get('/listallfollowup',[
    //validarJWT,
    validateFields
], httpFollowup.listallfollowup);

router.get('/listfollowupbyid/:id',[
    check('id', 'El id proporcionado no es valido').isMongoId(),
    //validarJWT,
    validateFields
], httpFollowup.listfollowupbyid);

router.get('/listfollowupbyassignment/:idassigment',[
    check('idassigment', 'El id proporcionado no es valido').isMongoId(),
    //validarJWT,
    validateFields
], httpFollowup.listfollowupbyassignment);

router.get('/listfollowupbyinstructor/:idinstructor',[
    check('id', 'El id proporcionado no es valido').isMongoId(),
    //validarJWT,
    validateFields
], httpFollowup.listfollowupbyinstructor);

router.post('/addfollowup',[
    check('assignment', 'El ID de assignment es obligatorio').notEmpty(),
    check('assignment', 'El ID de assignment no es valido').isMongoId(),
    check('instructor', 'El ID de instructor es obligatorio').notEmpty(),
    check('instructor', 'El ID de instructor no es valido').isMongoId(),
    check('number', 'El campo number es obligatorio').notEmpty(),
    check('month', 'El campo month debe ser una fecha valida').isDate(),
    check('document', 'El campo document es obligatorio').notEmpty(),
    check('status', 'El campo status debe ser un numero').isInt(),
    check('users', 'El campo users es obligatorio').notEmpty(),
    check('observations.*.observation', 'Cada observación es obligatoria').notEmpty(),
    check('observations.*.user', 'El usuario en cada observación es obligatorio y debe ser un ID de MongoDB válido').notEmpty().isMongoId(),
    check('observations.*.date', 'La fecha en cada observación es obligatoria y debe ser una fecha válida').notEmpty().isDate(),
    //validarJWT,
    validateFields    
], httpFollowup.insertFollowup);


router.put('/updatefollowupbyid/:id',[
    check(),
    //validarJWT,
    validateFields
], httpFollowup.updatefollowupbyid);

router.put('/updatestatus/:id/:status',[
    check(),
    //validarJWT,
    validateFields
], httpFollowup.updatestatus);




export default router;