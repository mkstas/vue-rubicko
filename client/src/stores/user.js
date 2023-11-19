import { ref } from 'vue'
import { defineStore } from 'pinia'
import axios from '../axios'

export const useUserStore = defineStore('user', () => {
	const userData = ref({})
	const isAuth = ref(false)

	const login = async (data) => {
		try {
			const response = await axios.post('/login', data)
			const { token, ...user } = response.data

			userData.value = { ...user }
			localStorage.setItem('token', token)
		} catch (error) {
			if (error.response) {
				return error.response.data
			}
			return [{ msg: 'Ошибка сети' }]
		}
	}

	const register = async (data) => {
		try {
			const response = await axios.post('/register', data)
			const { token, ...user } = response.data

			userData.value = { ...user }
			localStorage.setItem('token', token)
		} catch (error) {
			if (error.response) {
				return error.response.data
			}
			return [{ msg: 'Ошибка сети' }]
		}
	}

	const logout = () => {
		localStorage.removeItem('token')
		userData.value = {}
		isAuth.value = false
	}

	 const getMe = async () => {
		try {
			const response = await axios.get('/user', {
				headers: {
					Authorization: localStorage.getItem('token')
				}
			})

			userData.value = { ...response.data }
		} catch (error) {

		}
	}

	 const get = async (userName) => {
		try {
			await getMe()

			const response = await axios.get('/user/' + userName)
			const user = response.data

			isAuth.value = user._id === userData.value._id

			return response.data
		} catch (error) {

		}
	}

	const update = async (data) => {
		try {
			const response = await axios.patch('/user', data, {
				headers: {
					Authorization: localStorage.getItem('token')
				}
			})

			Object.assign(userData.value, response.data.data)

			return {
				success: true,
				message: 'Профиль успешно обновлен'
			}
		} catch (error) {
			if (error.response) {
				return error.response.data
			}
			return [{ param: 'network', msg: 'Ошибка сети' }]
		}
	}

	return {
		userData,
		isAuth,
		login,
		register,
		logout,
		getMe,
		get,
		update
	}
})
