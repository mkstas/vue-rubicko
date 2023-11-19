import mongoose from 'mongoose'

const projectShema = new mongoose.Schema({
	userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
	title: { type: String, required: true },
	html: { type: String, default: '' },
	css: { type: String, default: '' },
	javaScript: { type: String, default: '' },
	liked: { type: Array, default: [] }
}, {
	timestamps: true
})

export default mongoose.model('Project', projectShema)
