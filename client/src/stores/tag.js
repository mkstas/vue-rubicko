import { ref } from 'vue'
import { defineStore } from 'pinia'
import axios from '../axios'

export const useTagStore = defineStore('tag', () => {
	const tags = ref([])

	const get = async (userId) => {
		try {
			const response = await axios.get('/tag')

			tags.value = [ ...response.data ]
		} catch (error) {

		}
	}

	return {
		tags,
		get,
	}
})
