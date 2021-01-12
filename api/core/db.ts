import mongoose from 'mongoose';

const URI = process.env.MONGO_URI || 'empty';

mongoose
	.connect(URI, {
		useNewUrlParser: true,
		useFindAndModify: false,
		useUnifiedTopology: true,
		useCreateIndex: true,
	})
	.then(() => console.log('MongoDB connected...'))
	.catch((error) => console.error(error));
