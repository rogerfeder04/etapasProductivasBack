import express from 'express';
import { check } from 'express-validator';
import useRepfora from '../controllers/repfora.js'
import authetication from '../services/authService.js'
import { validateRepfora } from '../middleware/validarJWT.js'
// import validarCampos from '../middleware/validarCampos.js';
// import ficheHelper from '../helpers/repfora.js'

const router = express.Router();

router.get('/instructors', [
  validateRepfora,
], useRepfora.listallinstructors);

router.get('/instructors/:id', [
  validateRepfora
], useRepfora.listinstructorbyid);

router.get('/fiches', [
  validateRepfora
], useRepfora.listallfiches);

router.get('/fiches/:id', [
  validateRepfora
], useRepfora.listafichebyid);

router.post('/login', [], useRepfora.login)

router.post('/validate', [], validateRepfora);


export default router;