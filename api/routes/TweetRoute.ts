import { Router } from 'express';
import { passport } from '../core/passport';
import { TweetsCtrl } from '../controllers/TweetController';
import { createTweetValidations } from '../validations/createTweet';
const router = Router();

router.get('/', TweetsCtrl.index);
router.get('/:id', TweetsCtrl.show);
router.post(
	'/',
	passport.authenticate('jwt', { session: false }),
	createTweetValidations,
	TweetsCtrl.create
);
router.patch(
	'/:id',
	passport.authenticate('jwt', { session: false }),
	createTweetValidations,
	TweetsCtrl.update
);
router.delete(
	'/:id',
	passport.authenticate('jwt', { session: false }),
	TweetsCtrl.delete
);

export const TweetRoute = router;
