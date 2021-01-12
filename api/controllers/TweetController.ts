import { TweetModel } from '../models/TweetModel';
import { validationResult } from 'express-validator';
import { isValidObjectId } from '../utils/isValidObjectId';

class TweetsController {
	async index(req, res): Promise<void> {
		try {
			const tweets = await TweetModel.find({})
				.populate('user')
				.sort({ createdAt: '-1' })
				.exec();
			res.json({
				status: 'success',
				data: tweets,
			});
		} catch (err) {
			res.status(500).json({
				status: 'error',
				message: err,
			});
		}
	}
	async show(req, res): Promise<void> {
		try {
			const tweetId = req.params.id;
			if (!isValidObjectId(tweetId)) {
				res.status(404).json({
					status: 'error',
					message: 'Твит не найден',
				});
			}

			const tweet = await TweetModel.findOne({ _id: tweetId })
				.populate('user')
				.exec();

			if (!tweet) {
				res.status(404).json({
					status: 'error',
					message: 'Твит не найден',
				});
			}
			res.json({
				status: 'success',
				data: tweet,
			});
		} catch (err) {
			res.status(404).json({
				status: 'error',
				message: err,
			});
		}
	}
	async create(req, res): Promise<void> {
		try {
			const errors = validationResult(req);
			const user = req.user;
			if (!errors.isEmpty()) {
				res.status(400).json({
					status: 'error',
					message: errors.array(),
				});
				return;
			}
			if (user) {
				const data = {
					text: req.body.text,
					imagesURLs: req.body.imagesURLs,
					user: user,
				};

				const tweet = await TweetModel.create(data);
				user.tweets.push(tweet._id);

				res.status(201).json({
					status: 'success',
					data: await tweet.populate('user').execPopulate(),
				});
			}
			res.status(500).json({
				status: 'error',
				message: 'Произошла какая-то ошибка',
			});
		} catch (err) {
			res.status(500).json({
				status: 'error',
				message: err,
			});
		}
	}
	async update(req, res): Promise<void> {
		try {
			const user = req.user;
			const tweetId = req.params.id;

			if (!isValidObjectId(tweetId)) {
				res.status(404).json({
					status: 'error',
					message: 'Твит не найден',
				});
			}
			if (!user) {
				res.status(500).json({
					status: 'error',
					message: 'Произошла какая-то ошибка',
				});
			}

			const tweet = await TweetModel.findById(tweetId);
			if (tweet) {
				const tweetOwnerId = String(tweet.user._id);
				const userTryingToDeleteId = String(user._id);
				if (tweetOwnerId === userTryingToDeleteId) {
					const editText = req.body.text;
					tweet.text = editText;
					tweet.save();
					res.json({
						status: 'success',
						data: tweet,
					});
				} else {
					res.status(403).json({
						status: 'error',
						message: 'Нельзя изменить чужой твит',
					});
				}
			} else {
				res.status(500).json({
					status: 'error',
					message: 'Произошла какая-то ошибка',
				});
			}
		} catch (err) {
			res.status(500).json({
				status: 'error',
				message: err,
			});
		}
	}
	async delete(req, res): Promise<void> {
		try {
			const user = req.user;
			const tweetId = req.params.id;
			if (!isValidObjectId(tweetId)) {
				res.status(404).json({
					status: 'error',
					message: 'Твит не найден',
				});
			}
			if (!user) {
				res.status(500).json({
					status: 'error',
					message: 'Произошла какая-то ошибка',
				});
			}

			const tweet = await TweetModel.findById(tweetId);
			if (tweet) {
				const tweetOwnerId = String(tweet.user._id);
				const userTryingToDeleteId = String(user._id);
				if (tweetOwnerId === userTryingToDeleteId) {
					tweet.remove();
					res.sendStatus(204);
				} else {
					res.status(403).json({
						status: 'error',
						message: 'Нельзя удалить чужой твит',
					});
				}
			} else {
				res.status(500).json({
					status: 'error',
					message: 'Произошла какая-то ошибка',
				});
			}
		} catch (err) {
			res.status(500).json({
				status: 'error',
				message: err,
			});
		}
	}
}

export const TweetsCtrl = new TweetsController();
