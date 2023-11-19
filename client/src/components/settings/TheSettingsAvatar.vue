<script setup>
	import { computed } from 'vue'
	import { useUserStore } from '../../stores/user'
	import { BaseButton, BaseFile } from '../base'

	const userStore = useUserStore()

	const src = computed(() => {
		return userStore.userData.avatarUrl
			? import.meta.env.VITE_APP_BACKEND_URL + userStore.userData.avatarUrl
			: false
	})

	const uploadAvatar = async (event) => {
		const formData = new FormData()
		formData.append('image', event.target.files[0])
		await userStore.update(formData)
	}

	const removeAvatar = async () => {
		await userStore.update({ avatarUrl: null })
	}
</script>

<template>
	<div class="grid gap-4">
		<h2 class="text-lg text-slate-900 font-semibold">Изображение профиля</h2>
		<div class="flex gap-4">
			<div class="w-24 h-24 bg-white shadow rounded-full overflow-hidden flex items-center justify-center">
				<svg v-if="!src" xmlns="http://www.w3.org/2000/svg" class="fill-slate-500" width="32" height="32" viewBox="0 0 256 256">
					<path d="M230.92 212c-15.23-26.33-38.7-45.21-66.09-54.16a72 72 0 1 0-73.66 0c-27.39 8.94-50.86 27.82-66.09 54.16a8 8 0 1 0 13.85 8c18.84-32.56 52.14-52 89.07-52s70.23 19.44 89.07 52a8 8 0 1 0 13.85-8ZM72 96a56 56 0 1 1 56 56a56.06 56.06 0 0 1-56-56Z"/>
				</svg>
				<img v-if="src" class="w-full h-full object-cover" :src="src" alt="Изображение профиля">
			</div>
			<div class="grid items-start">
				<BaseFile @input="uploadAvatar" />
				<BaseButton class="justify-self-start" color="red" @click="removeAvatar">
					Удалить
				</BaseButton>
			</div>
		</div>
	</div>
</template>
