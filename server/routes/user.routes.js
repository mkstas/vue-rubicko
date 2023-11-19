import { Router } from 'express'

import * as UserValidation from '../validations/user.validation.js'
import * as UserController from '../controllers/user.controller.js'

import { checkAuth, uploadFile, handleValidationErrors } from '../middlewares/app.middleware.js'

const router = Router()
const uploadImage = uploadFile('uploads/avatars', 'image')

router.route('/')
	.get(
		checkAuth,
		UserController.getMe
	)
	.patch(
		checkAuth,
		uploadImage,
		UserValidation.updateValidation,
		handleValidationErrors,
		UserController.updateUser
	)

router.route('/:username')
	.get(
		UserController.getUser
	)

export default router
