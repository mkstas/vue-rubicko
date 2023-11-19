import TagModel from '../models/tag.model.js'

export const get = async (req, res) => {
	try {
		const tags = await TagModel.find()

		res.status(200).json(tags)
	} catch (error) {
		return res.status(500).json({
			msg: 'Не удалось получить теги'
		})
	}
}
