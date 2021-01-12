import { Router } from 'express';
import { passport } from '../core/passport';
import { UserCtrl } from '../controllers/UserController';
const router = Router();

router.get('/', UserCtrl.index);
router.get('/me', passport.authenticate('jwt'), UserCtrl.getUserInfo);
router.get('/:username', UserCtrl.getByUsername);
router.patch('/', UserCtrl.update);

export const UserRoute = router;
