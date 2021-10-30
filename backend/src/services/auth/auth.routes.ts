import { Router } from 'express';
import { signin, signup } from './auth.controller';
import { verifySignup, schemaValidation } from '../../middlewares';
import { signupSchema, signinSchema } from './auth.schema';
const router: Router = Router();
const verify = [verifySignup.checkDuplicates, verifySignup.checkRolesExisted];

router
  .post('/register', verify, signup)
  .post('/login', signin);

export default router;
