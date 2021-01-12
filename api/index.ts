import dotenv from 'dotenv';
import './core/db';
dotenv.config();
import express from 'express';
import cors from 'cors';
import { passport } from './core/passport';
import { UserRoute } from './routes/UserRoute';
import { AuthRoute } from './routes/AuthRoute';
import { TweetRoute } from './routes/TweetRoute';
import { UploadRoute } from './routes/UploadRoute';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(passport.initialize());

app.use('/users', UserRoute);
app.use('/auth', AuthRoute);
app.use('/tweets', TweetRoute);
app.use('/upload', UploadRoute);

if (require.main === module) {
	const port = process.env.PORT || 3000;
	app.listen(port, () => {
		console.log(`API server listening on port ${port}`);
	});
}

export default app;
