import ProjectModel from '../models/project.model.js'

export const getProject = async (req, res) => {
	try {
		let project = null

		if (req.query.user) {
			project = await ProjectModel
				.find({ userId: req.query.user })
				.populate('userId').exec()
		} else if (req.params.id) {
			project = await ProjectModel
				.findOne({ _id: req.params.id })
				.populate('userId').exec()
		} else {
			project = await ProjectModel
				.find()
				.populate('userId').exec()
		}

		if (project.length < 0 ) {
			return res.status(404).json({
				msg: 'Проекты не найдены'
			})
		}

		const projectData = JSON.parse(JSON.stringify(project))

		res.status(200).json(projectData)
	} catch (error) {
		console.log(error)
		res.status(500).json({
			msg: 'Не удалось получить проект'
		})
	}
}

export const createProject = async (req, res) => {
	try {
		const document = new ProjectModel({
			userId: req.userId,
			...req.body
		})

		const project = await document.save()

		res.status(201).json(project)
	} catch (error) {
		console.log(error)
		res.status(500).json({
			message: 'Не удалось создать проект'
		})
	}
}

export const updateProject = async (req, res) => {
	try {
		const project = await ProjectModel.findOne({
			_id: req.params.id
		})

		if (!project) {
			return res.status(404).json({
				message: 'Проект не найден'
			})
		}

		Object.assign(project, req.body)

		project.save()

		res.status(200).json({
			success: true
		})
	} catch (error) {
		console.log(error)
		res.status(500).json({
			message: 'Не удалось обновить проект'
		})
	}
}

export const deleteProject = async (req, res) => {
	try {
		const project = await ProjectModel.findOne({
			_id: req.params.id
		})

		if (!project) {
			return res.status(404).json({
				message: 'Проект не найден'
			})
		}

		const projectUserId = JSON.parse(JSON.stringify(project.userId))

		if (req.userId !== projectUserId) {
			return res.status(403).json({
				msg: 'Доступ запрещен'
			})
		}

		project.deleteOne()

		res.status(200).json({
			success: true
		})
	} catch (error) {
		console.log(error)
		res.status(500).json({
			message: 'Не удалось удалить проект'
		})
	}
}

export const likeProject = async (req, res) => {
	try {
		const project = await ProjectModel.findOne({
			_id: req.params.id
		})

		if (!project) {
			return res.status(404).json({
				message: 'Проект не найден'
			})
		}

		if (project.liked.length > 0) {
			project.liked.forEach(userId => {
				if (userId === req.userId) {
					project.liked = project.liked.filter(userId => userId !== req.userId)
				} else {
					project.liked.push(req.userId)
				}
			})
		} else {
			project.liked.push(req.userId)
		}

		project.save()

		res.status(200).json(project)
	} catch (error) {
		console.log(error)
		res.status(500).json({
			message: 'Не удалось оценить проект'
		})
	}
}
