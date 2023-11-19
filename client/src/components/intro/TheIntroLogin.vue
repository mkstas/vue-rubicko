<script setup>
	import { ref } from 'vue'
	import { useRouter } from 'vue-router'
	import { useUserStore } from '../../stores/user'

	import {
		IntroCard, IntroButton, IntroLink, IntroForm,
		IntroFormTitle, IntroFormLabel, IntroFormInput
	} from './base'

	const loginData = ref({ email: '', password: '' })
	const error = ref('')
	const userStore = useUserStore()
	const router = useRouter()

	const login = async () => {
		const response = await userStore.login(loginData.value)

		if (response) {
			error.value = response[0].msg
			return
		}

		router.push(`/${userStore.userData.userName}`)
	}
</script>

<template>
	<IntroCard>
		<IntroForm method="post" @submit.prevent="login">
			<IntroFormTitle text="Вход" />
			<div class="grid">
				<IntroFormLabel text="Электронная почта" for="email" />
				<IntroFormInput id="email" name="email" type="email" v-model="loginData.email" />
				<p class="text-red-500" v-if="error">{{ error }}</p>
			</div>
			<div class="grid">
				<IntroFormLabel text="Пароль" for="password" />
				<IntroFormInput id="password" name="password" type="password" v-model="loginData.password" />
			</div>
			<IntroButton text="Войти" />
			<IntroLink url="/register">Регистрация</IntroLink>
		</IntroForm>
	</IntroCard>
</template>
