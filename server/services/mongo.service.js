import mongoose from 'mongoose'

export const mongo = {
	strict() {
		mongoose.set('strictQuery', false)
	},

	connect() {
		mongoose
			.connect(process.env.MONOGDB_URL)
			.then(() => console.log('DB ok'))
			.catch((error) => console.log('DB error: ' + error))
	}
}
