import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

import UserModel from '../models/user.model.js'

export const loginUser = async (req, res) => {
	try {
		const user = await UserModel.findOne({ email: req.body.email })

		if (!user) {
			return res.status(403).json([
				{ msg: 'Неверная электронная почта или пароль' }
			])
		}

		const isValidPass = await bcrypt.compare(req.body.password, user._doc.passwordHash)

		if (!isValidPass) {
			return res.status(403).json([
				{ msg: 'Неверная электронная почта или пароль' }
			])
		}

		const token = jwt.sign({
			_id: user._id
		}, process.env.JWT_SECRET_KEY, {
			expiresIn: '14d'
		})

		const { passwordHash, ...userData } = user._doc

		res.json({
			...userData,
			token
		})
	} catch (error) {
		console.log(error)
		res.status(500).json([
			{ msg: 'Не удалось авторизоваться' }
		])
	}
}

export const registerUser = async (req, res) => {
	try {
		const salt = await bcrypt.genSalt()
		const password = await bcrypt.hash(req.body.password, salt)

		const document = new UserModel({
			userName: req.body.userName.toLowerCase(),
			avatarUrl: null,
			email: req.body.email,
			passwordHash: password
		})

		const user = await document.save()

		const token = jwt.sign({
			_id: user._id
		}, process.env.JWT_SECRET_KEY, {
			expiresIn: '14d'
		})

		const { passwordHash, ...userData } = user._doc

		res.json({
			...userData,
			token
		})
	} catch (error) {
		console.log(error)
		res.status(500).json([
			{ msg: 'Не удалось зарегестрировать пользователя' }
		])
	}
}
