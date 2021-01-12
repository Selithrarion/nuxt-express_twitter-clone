import { body } from 'express-validator';

export const registerValidations = [
	body('email', 'Введите Email')
		.isEmail()
		.withMessage('Неверный Email'),
	body('fullname', 'Введите полное имя')
		.isString()
		.withMessage('Неверное имя')
		.isLength({ min: 2, max: 40 })
		.withMessage('Имя слишком короткое или слишком длинное'),
	body('username', 'Введите логин')
		.isString()
		.withMessage('Неверный логин')
		.isLength({ min: 2, max: 40 })
		.withMessage('Логин слишком короткий или слишком длинный'),
	body('password', 'Введите пароль')
		.isString()
		.withMessage('Неверный пароль')
		.isLength({ min: 6 })
		.withMessage('Минимальная длина пароля 6 символов'),
];
