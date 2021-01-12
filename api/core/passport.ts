import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as JWTstrategy, ExtractJwt } from 'passport-jwt';
import { UserModel } from '../models/UserModel';
import { generateMD5 } from '../utils/generateHash';

passport.use(
	new LocalStrategy(
		async (username, password, done): Promise<void> => {
			try {
				const user = await UserModel.findOne({
					$or: [{ email: username }, { username }],
				});

				if (!user) {
					return done(null, false);
				}

				const userHashPassword = generateMD5(password + process.env.SECRET_KEY);
				const userHashPasswordCorrect = user.password;

				if (userHashPasswordCorrect === userHashPassword) {
					return done(null, user);
				} else {
					return done(null, false);
				}
			} catch (err) {
				return done(err, false);
			}
		}
	)
);

passport.use(
	new JWTstrategy(
		{
			secretOrKey: process.env.SECRET_KEY || '123',
			jwtFromRequest: ExtractJwt.fromHeader('token'),
		},
		async (payload, done) => {
			try {
				const user = await UserModel.findById(payload.data._id).exec();

				if (!user) {
					return done(null, false);
				}
				return done(null, user);
			} catch (err) {
				return done(err, false);
			}
		}
	)
);

passport.serializeUser((user, done) => {
	done(null, user._id);
});

passport.deserializeUser((id, done) => {
	UserModel.findById(id, (err, user) => {
		done(err, user);
	});
});

export { passport };
