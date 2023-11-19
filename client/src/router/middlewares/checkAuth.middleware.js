export const checkAuthMiddleware = ((to, from, next) => {
	if (to.matched.some(record => record.meta.requiredAuth)) {
		if (localStorage.getItem('token') === null) {
			next({ path: '/' })
		} else {
			next()
		}
	} else if (localStorage.getItem('token')) {
		next({ path: '/news' })
	} else {
		next()
	}
})
