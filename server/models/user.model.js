import mongoose from 'mongoose'

const userShema = new mongoose.Schema({
	fullName: { type: String, required: false },
	userName: { type: String, required: true, unique: true },
	userBio: { type: String, required: false },
	avatarUrl: { type: String, required: false },
	email: { type: String, required: true, unique: true },
	passwordHash: { type: String, required: true },
}, {
	timestamps: true
})

export default mongoose.model('User', userShema)
