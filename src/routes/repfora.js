import express from 'express';
import { check } from 'express-validator';
import useRepfora from '../controllers/repfora.js'
import authetication from '../services/authService.js'
import { validateRepfora } from '../middleware/validarJWT.js'
// import validarCampos from '../middleware/validarCampos.js';
// import ficheHelper from '../helpers/repfora.js'

const router = express.Router();

router.get('/instructors', [], useRepfora.listallinstructors);

router.get('/instructors/:id', [], useRepfora.listinstructorbyid);

router.get('/fiches', [], useRepfora.listallfiches);

router.get('/fiches/:id', [], useRepfora.listafichebyid);

router.post('/login', async (req, res) => {
    try {
      const { email, password, role } = req.body;
      const token = await authetication.login(email, password, role);
      res.json({ token });
    } catch (error) {
      res.status(401).json({ message: error.message });
    }
  });

router.post('/validate', [], validateRepfora);


export default router;