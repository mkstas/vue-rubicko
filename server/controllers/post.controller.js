import PostModel from '../models/post.model.js'
import TagModel from '../models/tag.model.js'

export const getPost = async (req, res) => {
	try {
		let post = null

		if (req.query.user) {
			post = await PostModel
				.find({ userId: req.query.user })
				.populate('userId')
				.populate('tagId')
				.exec()
		} else if (req.params.id) {
			post = await PostModel
				.findOne({ _id: req.params.id })
				.populate('userId')
				.populate('tagId')
				.exec()
		} else {
			post = await PostModel
				.find()
				.populate('userId')
				.populate('tagId')
				.exec()
		}

		if (post.length < 0) {
			return res.status(404).json({
				message: 'Статьи не найдены'
			})
		}

		res.status(200).json(post)
	} catch (error) {
		console.log(error)
		res.status(500).json({
			message: 'Не удалось получить статьи'
		})
	}
}

export const createPost = async (req, res) => {
	try {
		const document = new PostModel({
			userId: req.userId,
			...req.body
		})

		if (req.file) {
			document.imageUrl = `/uploads/posts/${req.file.filename}`
		}

		const post = await document.save()

		res.status(201).json(post)
	} catch (error) {
		console.log(error)
		res.status(500).json({
			message: 'Не удалось создать статью'
		})
	}
}

export const updatePost = async (req, res) => {
	try {
		const post = await PostModel.findOne({ _id: req.params.id })

		if (!post) {
			return res.status(404).json({
				message: 'Статья не найдена'
			})
		}

		if (req.body.title) {
			post.title = req.body.title
		}

		if (req.body.text) {
			post.text = req.body.text
		}

		if (req.body.tagId) {
			post.tagId = req.body.tagId
		}

		if (req.file) {
			post.imageUrl = `/uploads/posts/${req.file.filename}`
		}

		post.save()

		res.status(200).json(post)
	} catch (error) {
		console.log(error)
		res.status(500).json({
			message: 'Не удалось обновить статью'
		})
	}
}

export const deletePost = async (req, res) => {
	try {
		const post = await PostModel.findOne({
			_id: req.params.id
		})

		if (!post) {
			return res.status(404).json({
				message: 'Статья не найдена'
			})
		}

		post.deleteOne()

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

export const likePost = async (req, res) => {
	try {
		const post = await PostModel.findOne({ _id: req.params.id })

		if (post.liked.length > 0) {
			post.liked.forEach(userId => {
				if (userId === req.userId) {
					post.liked = post.liked.filter(userId => userId !== req.userId)
				} else {
					post.liked.push(req.userId)
				}
			})
		} else {
			post.liked.push(req.userId)
		}

		post.save()

		res.status(200).json(post)
	} catch (error) {
		console.log(error)
		res.status(500).json({
			message: 'Не удалось оценить статью'
		})
	}
}
