import mongoose from 'mongoose'

const tagShema = new mongoose.Schema({
	title: { type: String, required: true },
}, {
	timestamps: true
})

export default mongoose.model('Tag', tagShema)
