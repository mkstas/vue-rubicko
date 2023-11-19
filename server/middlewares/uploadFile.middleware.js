import multer from 'multer'
import crypto from 'crypto'

export default (path, key) => {
	const storage = multer.diskStorage({
		destination: (_, __, cb) => {
			cb(null, path)
		},
		filename: (_, file, cb) => {
			const extension = file.originalname.match('\.[0-9a-z]{1,5}$')[0]
			const filename = crypto.createHash('md5').update(Date.now() + file.originalname).digest('hex')
			cb(null, filename + extension)
		}
	})

	const upload = multer({ storage })
	return upload.single(key)
}
