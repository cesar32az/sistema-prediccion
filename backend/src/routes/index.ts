import { Router } from 'express';
import authRoutes from '../services/auth/auth.routes';
import userRoutes from '../services/auth/user/user.routes';
import taskRoutes from '../api/tasks/routes/task.routes';
import patientRoutes from '../api/patients/routes/patient.routes';
import expedientRoutes from '../api/expedient/routes/expedient.routes';

const router: Router = Router();

router
  .use('/auth', authRoutes)
  .use('/tasks', taskRoutes)
  .use('/user', userRoutes)
  .use('/patient', patientRoutes)
  .use('/expedient', expedientRoutes);

export default router;
