import { model, Schema } from 'mongoose';

const TweetSchema = new Schema(
	{
		text: {
			type: String,
			required: true,
		},
		user: {
			type: Schema.Types.ObjectId,
			required: true,
			ref: 'User',
		},
		imagesURLs: [
			{
				type: String,
			},
		],
	},
	{
		timestamps: true,
	}
);
// likes
// retweets
// repl

export const TweetModel = model('Tweet', TweetSchema);
