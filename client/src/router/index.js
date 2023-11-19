import { createRouter, createWebHistory } from 'vue-router'
import { checkAuthMiddleware } from './middlewares/checkAuth.middleware'
import { loadLayoutMiddleware } from './middlewares/loadLayot.middleware'

const routes = [
	{
		path: '/',
		name: 'login',
		component: () => import('../views/LoginView.vue')
	},

	{
		path: '/register',
		name: 'register',
		component: () => import('../views/RegisterView.vue')
	},

	{
		path: '/:username',
		name: 'profile',
		component: () => import('../views/ProfileView.vue'),
		meta: {
			requiredAuth: true,
			layout: 'AppLayoutDefault'
		}
	},

	{
		path: '/:username/projects',
		name: 'projects',
		component: () => import('../views/ProjectsView.vue'),
		meta: {
			requiredAuth: true,
			layout: 'AppLayoutDefault'
		}
	},

	{
		path: '/:username/articles',
		name: 'articles',
		component: () => import('../views/ArticlesView.vue'),
		meta: {
			requiredAuth: true,
			layout: 'AppLayoutDefault'
		}
	},

	{
		path: '/editor/:id',
		name: 'editor',
		component: () => import('../views/CodeView.vue'),
		meta: {
			requiredAuth: true
		}
	},

	{
		path: '/:username/articles',
		name: 'articles',
		component: () => import('../views/ArticlesView.vue'),
		meta: {
			requiredAuth: true,
			layout: 'AppLayoutDefault'
		}
	},

	{
		path: '/article/:id',
		name: 'article',
		component: () => import('../views/ArticleView.vue'),
		meta: {
			requiredAuth: true,
			layout: 'AppLayoutDefault'
		}
	},

	{
		path: '/article/editor',
		name: 'articleCreate',
		component: () => import('../views/ArticleCreateView.vue'),
		meta: {
			requiredAuth: true,
			layout: 'AppLayoutDefault'
		}
	},

	{
		path: '/article/editor/:id',
		name: 'articleEditor',
		component: () => import('../views/ArticleEditorView.vue'),
		meta: {
			requiredAuth: true,
			layout: 'AppLayoutDefault'
		}
	},

	{
		path: '/news',
		name: 'news',
		component: () => import('../views/NewsView.vue'),
		meta: {
			requiredAuth: true,
			layout: 'AppLayoutDefault'
		}
	},

	{
		path: '/settings',
		name: 'settings',
		component: () => import('../views/SettingsView.vue'),
		meta: {
			requiredAuth: true,
			layout: 'AppLayoutDefault'
		}
	}
]

const router = createRouter({
	history: createWebHistory(),
	routes
})

router.beforeEach(checkAuthMiddleware)
router.beforeEach(loadLayoutMiddleware)

export default router
