import { Router } from 'express'

import * as TagController from '../controllers/tag.controller.js'

const router = Router()

router.route('/')
	.get(TagController.get)

export default router
