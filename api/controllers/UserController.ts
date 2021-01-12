import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';

import { body, validationResult } from 'express-validator';
import { generateMD5 } from '../utils/generateHash';
import { UserModel } from '../models/UserModel';
import { sendEmail } from '../utils/sendEmail';

class UserController {
	async index(req, res): Promise<void> {
		try {
			const users = await UserModel.find({}).exec();
			res.json({
				status: 'success',
				data: users,
			});
		} catch (err) {
			res.status(500).json({
				status: 'error',
				message: err,
			});
		}
	}
	async getByUsername(req, res): Promise<void> {
		try {
			const username = req.params.username;

			const user = await UserModel.findOne({ username: username })
				.populate('tweets')
				.exec();

			if (!user) {
				res.status(404).json({
					status: 'error',
					message: 'Пользователь не найден',
				});
			}
			res.json({
				status: 'success',
				data: user,
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
			if (!errors.isEmpty()) {
				res.status(400).json({
					status: 'error',
					message: errors.array(),
				});
				return;
			}
			const data = {
				email: req.body.email,
				username: req.body.username,
				fullname: req.body.fullname,
				password: generateMD5(req.body.password + process.env.SECRET_KEY),
				birthday: req.body.birthday,
				confirmHash: generateMD5(
					Math.random().toString() + process.env.SECRET_KEY
				),
			};

			const user = await UserModel.create(data);

			sendEmail(
				{
					emailFrom: 'admin@twiiter.com',
					emailTo: data.email,
					subject: 'Подтверждение почты Nuxt Twitter Clone',
					html: `Для того, чтобы подтвердить почту, перейдите <a href="${process.env.BASE_URL}/api/auth/verify?hash=${data.confirmHash}">по этой ссылке</a>`,
				},
				(err: Error | null) => {
					if (err) {
						res.status(500).json({
							status: 'error',
							message: err,
						});
					} else {
						res.status(201).json({
							status: 'success',
							data: user,
						});
					}
				}
			);
		} catch (err) {
			res.status(500).json({
				status: 'error',
				message: err,
			});
		}
	}
	async update(req, res): Promise<void> {
		try {
			const userID = req.body.id;
			const $set = {
				fullname: req.body.fullname,
				about: req.body.about,
				location: req.body.location,
				website: req.body.website,
			};

			const user = await UserModel.findOneAndUpdate(
				{ _id: userID },
				{ $set },
				{
					new: true,
				}
			);

			res.json({
				status: 'success',
				data: user,
			});
		} catch (err) {
			res.status(500).json({
				status: 'error',
				message: err,
			});
		}
	}
	async verify(req, res): Promise<void> {
		try {
			const hash = req.query.hash;
			if (!hash) {
				res.status(404).send('Нет hash');
			}
			const user = await UserModel.findOne({
				confirmHash: hash,
			});

			if (user) {
				user.confirmed = true;
				user.save();
				res.json({
					status: 'success',
				});
			} else {
				res.status(404).json({
					status: 'error',
					message: 'Пользователь не найден',
				});
			}
		} catch (err) {
			res.status(500).json({
				status: 'error',
				message: err,
			});
		}
	}
	async afterLogin(req, res): Promise<void> {
		try {
			const user = req.user ? req.user.toJSON() : undefined;
			const SECRET = process.env.SECRET_KEY || Math.random().toString();
			res.json({
				status: 'success',
				data: {
					...user,
					token: jwt.sign({ data: req.user }, SECRET, {
						expiresIn: '30 days',
					}),
				},
			});
		} catch (err) {
			res.status(500).json({
				status: 'error',
				message: err,
			});
		}
	}
	async getUserInfo(req, res): Promise<void> {
		try {
			const user = req.user ? req.user.toJSON() : undefined;

			res.json({
				status: 'success',
				data: user,
			});
		} catch (err) {
			res.status(500).json({
				status: 'error',
				message: err,
			});
		}
	}
}

export const UserCtrl = new UserController();
