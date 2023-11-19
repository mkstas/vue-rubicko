import { ref } from 'vue'
import { defineStore } from 'pinia'
import axios from '../axios'

export const useArticleStore = defineStore('post', () => {
	const articles = ref([])
	const articleData = ref({})

	const get = async (userId) => {
		try {
			const response = await axios.get('/post?user=' + userId)

			articles.value = [ ...response.data ]
		} catch (error) {

		}
	}

	const getOne = async (articleId) => {
		try {
			const response = await axios.get('/post/' + articleId)
			articleData.value = { ...response.data }
		} catch (error) {

		}
	}

	const create = async (formData) => {
		try {
			const response = await axios.post('/post', formData, {
				headers: {
					Authorization: localStorage.getItem('token')
				}
			})

			articleData.value = response.data
		} catch (error) {

		}
	}

	const update = async (articleId, formData) => {
		try {
			const response = await axios.patch('/post/' + articleId, formData, {
				headers: {
					Authorization: localStorage.getItem('token')
				}
			})

			articleData.value = { ...response.data }

			return {
				success: true,
				message: 'Статья успешно обновлена'
			}
		} catch (error) {

		}
	}

	const remove = async () => {
		try {
			await axios.delete('/post/' + articleData.value._id, {
				headers: {
					Authorization: localStorage.getItem('token')
				}
			})
		} catch (error) {

		}
	}

	const like = async (articletId) => {
		try {
			const response = await axios.patch('/post/like/' + articletId, {}, {
				headers: {
					Authorization: localStorage.getItem('token')
				}
			})

			articles.value.forEach(article => {
				if (article._id === response.data._id) {
					article.liked = response.data.liked
				}
			})
		} catch (error) {

		}
	}

	const likeOne = async (articleId) => {
		try {
			const response = await axios.patch('/post/like/' + articleId, {}, {
				headers: {
					Authorization: localStorage.getItem('token')
				}
			})

			articleData.value.liked = response.data.liked
		} catch (error) {

		}
	}

	return {
		articles,
		articleData,
		get,
		getOne,
		create,
		update,
		remove,
		like,
		likeOne
	}
})
