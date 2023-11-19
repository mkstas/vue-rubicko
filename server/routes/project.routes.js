import { Router } from 'express'

import * as ProjectValidation from '../validations/project.validation.js'
import * as ProjectController from '../controllers/project.controller.js'

import { checkAuth, handleValidationErrors } from '../middlewares/app.middleware.js'

const router = new Router()

router.route('/')
	.get(
		ProjectController.getProject
	)
	.post(
		checkAuth,
		ProjectValidation.createValidation,
		handleValidationErrors,
		ProjectController.createProject
	)

router.route('/:id')
	.get(
		ProjectController.getProject
	)
	.patch(
		checkAuth,
		ProjectController.updateProject
	)
	.delete(
		checkAuth,
		ProjectController.deleteProject
	)

router.route('/like/:id')
	.patch(
		checkAuth,
		ProjectController.likeProject
	)

export default router
