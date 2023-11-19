<script setup>
	import { ref } from 'vue'
	import { useRouter } from 'vue-router'
	import { useUserStore } from '../../stores/user'

	import {
		IntroCard, IntroButton, IntroLink, IntroForm,
		IntroFormTitle, IntroFormLabel, IntroFormInput
	} from './base'

	const data = ref({
		email: '',
		userName: '',
		password: ''
	})

	const errors = ref({
		userName: '',
		email: '',
		password: ''
	})

	const userStore = useUserStore()
	const router = useRouter()

	const register = async () => {
		const response = await userStore.register(data.value)

		Object.keys(errors.value).forEach(msg => errors.value[msg] = '')

		if (response) {
			response.forEach(error => {
				Object.keys(errors.value).forEach(msg => {
					if (msg === error.param) {
						errors.value[msg] = error.msg
					}
				})
			})

			return
		}

		router.push(`/${userStore.userData.userName}`)
	}
</script>

<template>
	<IntroCard>
		<IntroForm method="post" @submit.prevent="register">
			<IntroFormTitle text="Регистрация" />
			<div class="grid">
				<IntroFormLabel text="Никнейм" for="username" />
				<IntroFormInput id="username" name="username" type="text" v-model="data.userName" />
				<p class="text-red-500" v-if="errors.userName">{{ errors.userName }}</p>
			</div>
			<div class="grid">
				<IntroFormLabel text="Электронная почта" for="email" />
				<IntroFormInput id="email" name="email" type="email" v-model="data.email" />
				<p class="text-red-500" v-if="errors.email">{{ errors.email }}</p>
			</div>
			<div class="grid">
				<IntroFormLabel text="Пароль" for="password" />
				<IntroFormInput id="password" name="password" type="password" v-model="data.password" />
				<p class="text-red-500" v-if="errors.password">{{ errors.password }}</p>
			</div>
			<IntroButton text="Зарегистрироваться" />
			<IntroLink url="/">Вход</IntroLink>
		</IntroForm>
	</IntroCard>
</template>
