import { Router } from 'express';
import { getProfile, updateProfile } from './user.controller';
import passport from 'passport';

const router: Router = Router();
const auth = passport.authenticate('jwt', { session: false });

router.get('/', auth, getProfile).put('/', auth, updateProfile);

export default router;
