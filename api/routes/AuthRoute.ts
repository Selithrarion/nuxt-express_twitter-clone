import { Router } from 'express';
import { passport } from '../core/passport';
import { UserCtrl } from '../controllers/UserController';
import { registerValidations } from '../validations/register';
const router = Router();

router.get('/verify', UserCtrl.verify);
router.post('/register', registerValidations, UserCtrl.create);
router.post(
	'/login',
	passport.authenticate('local', { session: false }),
	UserCtrl.afterLogin
);

export const AuthRoute = router;
