import express from 'express';
import { check } from 'express-validator';
import useRepfora from '../controllers/repfora.js'
import authetication from '../services/authService.js'
import { validateRepfora } from '../middleware/validate-admin.js'
import { validate }  from '../middleware/validateJWT.js'
// import validarCampos from '../middleware/validarCampos.js';
// import ficheHelper from '../helpers/repfora.js'

const router = express.Router();

// router.get('/instructors', [
//   validateRepfora,
// ], useRepfora.listallinstructors);

router.get('/instructors', [
  validate.validateRepfora,
], useRepfora.listallinstructors);

router.get('/instructors/:id', [
  validate.validateRepfora,
], useRepfora.listinstructorbyid);

router.get('/fiches', [
  validate.validateRepfora,
], useRepfora.listallfiches);

router.get('/fiches/:id', [
  validate.validateRepfora,
], useRepfora.listafichebyid);

router.post('/login', [], useRepfora.login)

router.post('/logininstructors', [], useRepfora.logininstructos)

router.post('/validate', [], validateRepfora);


export default router;