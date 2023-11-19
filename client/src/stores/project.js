import { ref } from 'vue'
import { defineStore } from 'pinia'
import axios from '../axios'

export const useProjectStore = defineStore('project', () => {
	const projects = ref([])
	const projectData = ref({})

	const get = async (userId) => {
		try {
			const response = await axios.get('/project?user=' + userId)
			projects.value = [ ...response.data ]
		} catch (error) {

		}
	}

	const getOne = async (projectId) => {
		try {
			const response = await axios.get('/project/' + projectId)
			projectData.value = { ...response.data }
		} catch (error) {

		}
	}

	const create = async (projectName) => {
		try {
			const response = await axios.post('/project/', { title: projectName }, {
				headers: {
					Authorization: localStorage.getItem('token')
				}
			})
			projectData.value = { ...response.data }
		} catch (error) {
			if (error.response) {
				return error.response.data
			}
			return [{ param: 'network', msg: 'Ошибка сети' }]
		}
	}

	const update = async () => {
		try {
			await axios.patch('/project/' + projectData.value._id, projectData.value, {
				headers: {
					Authorization: localStorage.getItem('token')
				}
			})
		} catch (error) {

		}
	}

	const remove = async () => {
		try {
			await axios.delete('/project/' + projectData.value._id, {
				headers: {
					Authorization: localStorage.getItem('token')
				}
			})
		} catch (error) {

		}
	}

	const like = async (projectId) => {
		try {
			const response = await axios.patch('/project/like/' + projectId, {}, {
				headers: {
					Authorization: localStorage.getItem('token')
				}
			})

			projects.value.forEach(project => {
				if (project._id === response.data._id) {
					project.liked = response.data.liked
				}
			})
		} catch (error) {

		}
	}

	return {
		projects,
		projectData,
		get,
		getOne,
		create,
		update,
		remove,
		like
	}
})
