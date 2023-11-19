module.exports = {
	content: [
		"./index.html",
		"./src/**/*.{vue,js,scss}"
	],
	theme: {
		screens: {
			'sm': '28rem',
			'md': '48rem',
			'lg': '64rem'
		},
		container: {
			center: true,
			padding: '0.75rem'
		},
		extend: {},
	},
	plugins: []
}
