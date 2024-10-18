import express from 'express';
import { check } from "express-validator";
import multer from 'multer';
import httpApprentices from "../controllers/apprentices.js";
import validateFields from "../middleware/validate-fields.js";
import { validateRepfora } from "../middleware/validate-admin.js"
import apprenticeHelper from "../helpers/apprentices.js";
import ficheHelper from "../helpers/repfora.js"
import modalityHelper from "../helpers/modality.js";


const router = express.Router();
const upload = multer();

router.get('/listallapprentice', [
    validateRepfora
], httpApprentices.listApprentices);

router.get('/listapprenticebyid/:id', [
    validateRepfora,
    check('id', 'El ID no es valido').isMongoId(),
    check('id').custom(apprenticeHelper.existApprenticeID),
    validateFields
], httpApprentices.listApprenticesByID);

router.get('/listapprenticebyfiche/:idfiche', [
    validateRepfora,
    check('idfiche')
    .custom(async (idfiche, { req }) => {
        await ficheHelper.existsFicheID(idfiche, req.headers.token);
    })
    .withMessage('ID de ficha es obligatorio'),

    validateFields
], httpApprentices.listApprenticesByFiche);

router.get('/listapprenticebystatus/:status', [
    validateRepfora
], httpApprentices.listApprenticeByStatus);  // Coma adicional removida

router.post('/loginApprentice', [

], httpApprentices.loginApprentice)

router.post('/addapprentice', [
    validateRepfora,
    check('fiche', 'El campo ficha es obligatorio').notEmpty(),
    check('fiche.idFiche', 'El ID no es valido').isMongoId(),
    check('fiche.idFiche').custom(async (idFiche, { req }) =>
        {await ficheHelper.existsFicheID(idFiche, req.headers.token)}),
    check('fiche.number', 'El codigo de la ficha es obligatorio').notEmpty(),
    check('fiche.name', 'El nombre de la ficha es obligatorio').notEmpty(),
    check('tpDocument', 'el documento es obligatorio').notEmpty(),
    check('numDocument', 'el documento es obligatorio').notEmpty(),
    check('firstName', 'el nombre es obligatorio').notEmpty(),
    check('lastName', 'el apellido es obligatorio').notEmpty(),
    check('phone', 'el telefono es obligatorio').notEmpty(),
    check('email', 'el email es obligatorio').notEmpty(),
    check('modality', 'No es un ID válido').isMongoId(),
    check('modality').custom(modalityHelper.existeModalityID),
    validateFields
], httpApprentices.addApprenticenPreregister);

// router.post('/addapprentice', [
//     validateRepfora,
//     check('fiche', 'El campo ficha es obligatorio').notEmpty(),
//     check('fiche.idFiche', 'El ID no es valido').isMongoId(),
//     check('fiche.idFiche').custom(async (idFiche, { req }) =>
//         {await ficheHelper.existsFicheID(idFiche, req.headers.token)}),
//     check('fiche.number', 'El codigo de la ficha es obligatorio').notEmpty(),
//     check('fiche.name', 'El nombre de la ficha es obligatorio').notEmpty(),
//     check('tpDocument', 'el documento es obligatorio').notEmpty(),
//     check('numDocument', 'el documento es obligatorio').notEmpty(),
//     check('firstName', 'el nombre es obligatorio').notEmpty(),
//     check('lastName', 'el apellido es obligatorio').notEmpty(),
//     check('phone', 'el telefono es obligatorio').notEmpty(),
//     check('email', 'el email es obligatorio').notEmpty(),
//     validateFields
// ], httpApprentices.addApprenticenPreregister);

router.post('/upload', upload.single('file'), async (req, res) => {
    try {
        const createdRecords = await httpApprentices.createApprenticesCSV(req.file); // Pasa el archivo a la función
        res.status(201).json({ message: 'Aprendices y preregistros guardados exitosamente', data: createdRecords });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.put('/updateapprenticebyid/:id', [
    validateRepfora,
    check('id').custom(apprenticeHelper.existApprenticeID),
    check('fiche', 'El campo ficha es obligatorio').optional().notEmpty(),
    check('fiche.idFiche', 'El ID no es valido').optional().isMongoId(),
    check('fiche.idFiche').optional().custom(async (idFiche, { req }) =>
        {if (idFiche) {await ficheHelper.existsFicheID(idFiche, req.headers.token);}}),
    check('fiche.number', 'El código de la ficha es obligatorio').optional().notEmpty(),
    check('fiche.name', 'El nombre de la ficha es obligatorio').optional().notEmpty(),
    check('tpDocument', 'El tipo de documento es obligatorio').optional().notEmpty(),
    check('numDocument', 'El número de documento es obligatorio').optional().notEmpty(),
    check('firstName', 'El nombre es obligatorio').optional().notEmpty(),
    check('lastName', 'El apellido es obligatorio').optional().notEmpty(),
    check('phone', 'El teléfono es obligatorio').optional().notEmpty(),
    check('email', 'El email es obligatorio').optional().notEmpty(),
    validateFields
], httpApprentices.updateApprenticeByID);


router.put('/enableapprentice/:id', [
    validateRepfora,
    check('id').custom(apprenticeHelper.existApprenticeID),
    validateFields
], httpApprentices.enableApprencice);

router.put('/disableapprentice/:id', [
    validateRepfora,
    check('id').custom(apprenticeHelper.existApprenticeID),
    validateFields
], httpApprentices.disableApprentice);

export default router;
