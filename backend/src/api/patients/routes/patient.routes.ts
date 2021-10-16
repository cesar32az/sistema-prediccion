import { Router } from 'express';
import passport from 'passport';
import {
  createPatient,
  deletePatient,
  getAllPatients,
  getOnePatient,
  updatePatient,
} from '../controllers/patient';

const router: Router = Router();
const auth = passport.authenticate('jwt', { session: false });

router
  .post('/', auth, createPatient)
  .get('/', getAllPatients)
  .get('/:id', getOnePatient)
  .put('/:id', updatePatient)
  .delete('/:id', deletePatient);

export default router;
