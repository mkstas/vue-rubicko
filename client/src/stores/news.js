import { ref } from 'vue'
import { defineStore } from 'pinia'
import axios from '../axios'

export const useNewsStore = defineStore('news', () => {
	const articles = ref([])
	const projects = ref([])

	const getArticles = async () => {
		try {
			const response = await axios.get('/post')
			articles.value = response.data
		} catch (error) {

		}
	}

	const getProjects = async () => {
		try {
			const response = await axios.get('/project')
			projects.value = response.data
		} catch (error) {

		}
	}

	return {
		articles,
		projects,
		getArticles,
		getProjects
	}
})
