export const listener = (error) => {
	if (error) {
		return console.log(error)
	}

	console.log('Server Ok')
}
