import { body } from 'express-validator'

import UserModel from '../models/user.model.js'

export const loginValidation = [
	body('email', 'Неверный формат почты').isEmail(),
]

export const registerValidation = [
	body('userName', 'Минимальная длина 2 символа').custom(async value => {
		const user = await UserModel.findOne({ userName: value })
		if (user) return Promise.reject('Никнейм уже занят')
	}).isLength({ min: 2 }),

	body('email', 'Неверный формат почты').isEmail().custom(async value => {
		const user = await UserModel.findOne({ email: value })
		if (user) return Promise.reject('Электронная почта уже занята')
	}),

	body('password', 'Минимальная длина 8 символов')
		.isLength({ min: 8 })
]
