import { body } from 'express-validator'

export const createValidation = [
	body('title')
		.isLength({ min: 2 })
		.withMessage('Минимальная длина 2 символа')
		.isLength({ max: 32 })
		.withMessage('Максимальная длина 16 символов')
]
