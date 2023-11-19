export const loadLayoutMiddleware = async (route) => {
	const layout = route.meta.layout || 'AppLayoutBlank'
	const component = await import(`../../layouts/${layout}.vue`)
	route.meta.layoutComponent = component.default
}
