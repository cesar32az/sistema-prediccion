import { Router } from 'express';
import passport from 'passport';
import { updateExpedient } from "../controllers/expedient";

const router: Router = Router();
const auth = passport.authenticate('jwt', { session: false });

router.put('/:id', updateExpedient)

export default router;

