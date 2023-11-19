<script setup>
	import { ref, onBeforeMount } from 'vue'
	import { useUserStore } from '../../stores/user'

	import {
		BaseButton, BaseLabel,
		BaseInput, BaseTextarea
	} from '../base'

	const userData = ref({})

	const errors = ref({
		userName: '',
		fullName: '',
		userBio: '',
		network: ''
	})

	const successMessage = ref('')

	const userStore = useUserStore()

	const saveData = async () => {
		const data = {}

		if (userData.value.userName !== userStore.userData.userName) {
			data.userName = userData.value.userName
		}

		if (userData.value.fullName !== userStore.userData.fullName) {
			data.fullName = userData.value.fullName
		}

		if (userData.value.userBio !== userStore.userData.userBio) {
			data.userBio = userData.value.userBio
		}

		const response = await userStore.update(data)

		if (response.success) {
			successMessage.value = response.message
			return
		} else {
			successMessage.value = ''
		}

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
	}

	onBeforeMount(() => userData.value = { ...userStore.userData })
</script>

<template>
	<div class="grid gap-4">
		<h2 class="text-lg text-slate-900 font-semibold">Данные профиля</h2>
		<p class="text-green-500" v-if="successMessage">{{ successMessage }}</p>
		<form class="max-w-xs grid gap-4" method="post" @submit.prevent>
			<div class="grid">
				<BaseLabel text="Никнейм" for="userName" />
				<BaseInput
					type="text"
					id="userName"
					:value="userData.userName"
					v-model="userData.userName"
				/>
				<p class="text-red-500" v-if="errors.userName">{{ errors.userName }}</p>
				<p class="text-red-500" v-if="errors.network">{{ errors.network }}</p>
			</div>
			<div class="grid">
				<BaseLabel text="Имя" for="name" />
				<BaseInput
					type="text"
					id="name"
					:value="userData.fullName"
					v-model="userData.fullName"
				/>
				<p class="text-red-500" v-if="errors.fullName">{{ errors.fullName }}</p>
			</div>
			<div class="grid">
				<BaseLabel text="О себе" for="userBio" />
				<BaseTextarea
					id="userBio"
					cols="30"
					rows="5"
					:value="userData.userBio"
					v-model="userData.userBio"
				/>
				<p class="text-red-500" v-if="errors.userBio">{{ errors.userBio }}</p>
			</div>
			<BaseButton class="justify-self-start" @click="saveData">
				Сохранить
			</BaseButton>
		</form>
	</div>
</template>
