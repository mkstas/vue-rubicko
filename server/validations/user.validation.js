import { body } from 'express-validator'
import UserModel from '../models/user.model.js'

export const updateValidation = [
	body('userName', 'Минимальная длина 2 символа').custom(async value => {
		const user = await UserModel.findOne({ userName: value })
		if (user) return Promise.reject('Никнейм уже занят')
	}).optional().isLength({ min: 2 }),

	body('fullName', 'Не более 64 символов')
		.optional().isLength({ max: 64 }),

	body('userBio', 'Не более 256 символов')
		.optional().isLength({ max: 256 })
]
