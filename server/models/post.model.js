import mongoose from 'mongoose'

const postShema = new mongoose.Schema({
	userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
	tagId: { type: mongoose.Schema.Types.ObjectId, ref: 'Tag', required: true },
	title: { type: String, required: true },
	text: { type: String, required: true },
	imageUrl: { type: String, required: false },
	liked: { type: Array, required: true, default: [] }
}, {
	timestamps: true
})

export default mongoose.model('Post', postShema)
