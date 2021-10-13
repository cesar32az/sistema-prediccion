import { Router } from 'express';
import passport from 'passport';

const router: Router = Router();
const auth = passport.authenticate('jwt', { session: false });

export default router;

