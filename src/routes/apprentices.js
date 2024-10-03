import express from 'express';
import { check } from "express-validator";
import httpApprentices from "../controllers/apprentices.js";
import validarCampos from "../middleware/validarCampos.js";
import {validateRepfora} from "../middleware/validarJWT.js"
import apprenticeHelper from "../helpers/apprentices.js";
import { ficheHelper } from "../helpers/repfora.js"
import modalityHelper from "../helpers/modality.js";

const router = express.Router();

router.get('/listallapprentice', [
    // validarJWT,
    // validarCampos
], httpApprentices.listApprentices);

router.get('/listapprenticebyid/:id', [
    // validarJWT,
    check('id', 'El ID no es valido').isMongoId(),
    check('id').custom(apprenticeHelper.existApprenticeID),
    validarCampos
], httpApprentices.listApprenticesByID);

router.get('/listapprenticebyfiche/:idfiche', [
    // validarJWT,
    check('idfiche').custom(ficheHelper.existsFicheID),
    validarCampos
], httpApprentices.listApprenticesByFiche);

router.get('/listapprenticebystatus/:status', [
    // validarJWT,
], httpApprentices.listApprenticeByStatus);  // Coma adicional removida

router.post('/addapprentice', [
    // validarJWT,
    check('fiche', 'El campo ficha es obligatorio').notEmpty(),
    check('fiche.idFiche', 'El ID no es valido').isMongoId(),
    check('fiche.idFiche').custom(ficheHelper.existsFicheID),
    check('fiche.number', 'El codigo de la ficha es obligatorio').notEmpty(),
    check('fiche.name', 'El nombre de la ficha es obligatorio').notEmpty(),
    check('tpDocument', 'el documento es obligatorio').not().isEmpty(),
    check('numDocument', 'el documento es obligatorio').not().isEmpty(),
    check('firstName', 'el nombre es obligatorio').not().isEmpty(),
    check('lastName', 'el apellido es obligatorio').not().isEmpty(),
    check('phone', 'el telefono es obligatorio').not().isEmpty(),
    check('email', 'el email es obligatorio').not().isEmpty(),
    check('modality', 'No es un ID válido').isMongoId(),
    check('modality').custom(modalityHelper.existeModalityID),
    validarCampos
], httpApprentices.addApprenticenPreregister);

router.put('/updateapprenticebyid/:id', [
    // validarJWT,
    check('id').custom(apprenticeHelper.existApprenticeID),
    check('numDocument', 'el documento es obligatorio').not().isEmpty(),
    check('firstName', 'el nombre es obligatorio').not().isEmpty(),
    check('lastName', 'el apellido es obligatorio').not().isEmpty(),
    check('phone', 'el telefono es obligatorio').not().isEmpty(),
    check('email', 'el email es obligatorio').not().isEmpty(),
    validarCampos
], httpApprentices.updateApprenticeByID);

router.put('/enableapprentice/:id', [
    // validarJWT,
    check('id').custom(apprenticeHelper.existApprenticeID),
    validarCampos
], httpApprentices.enableApprencice);

router.put('/disableapprentice/:id', [
    // validarJWT,
    check('id').custom(apprenticeHelper.existApprenticeID),
    validarCampos
], httpApprentices.disableApprentice);

export default router;
