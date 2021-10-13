import { Router } from 'express';
import { signin, signup } from './auth.controller';
import { verifySignup, schemaValidation } from '../../middlewares';
import { signupSchema, signinSchema } from './auth.schema';
const router: Router = Router();
const verify = [verifySignup.checkDuplicates, verifySignup.checkRolesExisted];

router
  .post('/signup', verify, signup)
  .post('/signin', signin);

export default router;
