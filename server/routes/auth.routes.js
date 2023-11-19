import { Router } from 'express'

import * as AuthValidation from '../validations/auth.validation.js'
import * as AuthController from '../controllers/auth.controller.js'

import { handleValidationErrors } from '../middlewares/app.middleware.js'

const router = Router()

router.route('/login')
	.post(
		AuthValidation.loginValidation,
		handleValidationErrors,
		AuthController.loginUser
	)

router.route('/register')
	.post(
		AuthValidation.registerValidation,
		handleValidationErrors,
		AuthController.registerUser
	)

export default router
