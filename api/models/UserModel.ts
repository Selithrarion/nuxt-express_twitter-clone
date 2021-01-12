import { model, Schema } from 'mongoose';

const UserSchema = new Schema(
	{
		email: {
			type: String,
			unique: true,
			required: true,
		},
		fullname: {
			type: String,
			required: true,
		},
		username: {
			type: String,
			unique: true,
			required: true,
		},
		password: {
			type: String,
			required: true,
		},
		confirmed: {
			type: Boolean,
			default: false,
		},
		confirmHash: {
			type: String,
			required: true,
		},
		birthday: {
			type: String,
			required: true,
		},
		avatarUrl: {
			type: String,
			default: `https://yt3.ggpht.com/a/AGF-l7_GRLjiiIonJ82aAeGgO1lazf7DjIvGS5KEhg=s900-c-k-c0xffffffff-no-rj-mo`,
		},
		location: {
			type: String,
			default: '',
		},
		about: {
			type: String,
			default: '',
		},
		website: {
			type: String,
			default: '',
		},
		tweets: [
			{
				type: Schema.Types.ObjectId,
				ref: 'Tweet',
			},
		],
	},
	{
		timestamps: true,
	}
);
UserSchema.set('toJSON', {
	transform: (_, obj) => {
		delete obj.password;
		delete obj.confirmHash;
		return obj;
	},
});
//     followers
//     follows
//     tweets
//     notifications
// bookmarks
// likes
// blocked_users
// medias

export const UserModel = model('User', UserSchema);
