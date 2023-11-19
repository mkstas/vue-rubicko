import UserModel from '../models/user.model.js'

export const getMe = async (req, res) => {
	try {
		const user = await UserModel.findOne({ _id: req.userId })

		if (!user) {
			return res.status(404).json({
				message: 'Пользователь не найден'
			})
		}

		const { passwordHash, ...userData } = user._doc

		res.status(200).json(userData)
	} catch (error) {
		console.log(error)
		res.status(500).json({
			message: 'Не удалось получить данные'
		})
	}
}

export const getUser = async (req, res) => {
	try {
		const user = await UserModel.findOne({ userName: req.params.username })

		if (!user) {
			return res.status(404).json({
				message: 'Пользователь не найден'
			})
		}

		const { passwordHash, ...userData } = user._doc

		res.status(200).json(userData)
	} catch (error) {
		console.log(error)
		res.status(500).json({
			message: 'Не удалось получить данные'
		})
	}
}

export const updateUser = async (req, res) => {
	try {
		let body = {}

		if (req.file) {
			body.avatarUrl = `/uploads/avatars/${req.file.filename}`
		}

		if (!req.file) {
			if (req.body.userName) {
				req.body.userName = req.body.userName.toLowerCase()
			}

			body = { ...req.body }
		}

		await UserModel.updateOne({
			_id: req.userId
		}, body)

		res.status(200).json({
			success: true,
			data: body
		})
	} catch (error) {
		console.log(error)
		res.status(500).json({
			message: 'Не удалось обновить данные'
		})
	}
}
