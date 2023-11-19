<script setup>
	import { ref, onBeforeMount } from 'vue'
	import { useUserStore } from '../stores/user'
	import { BaseLoader } from '../components/base'
	import TheSettingsAvatar from '../components/settings/TheSettingsAvatar.vue'
	import TheSettingsBio from '../components/settings/TheSettingsBio.vue'

	const isLoading = ref(false)
	const userStore = useUserStore()

	const fetchData = async () => {
		try {
			isLoading.value = true
			await userStore.getMe()
			isLoading.value = false
		} catch (error) {
			isLoading.value = false
		}
	}

	onBeforeMount(() => fetchData())
</script>

<template>
	<BaseLoader class="mx-auto my-10" v-if="isLoading" />
	<div class="grid gap-8" v-if="!isLoading">
		<h1 class="text-2xl text-slate-900 font-bold">Настройки</h1>
		<div class="grid gap-6">
			<TheSettingsAvatar />
			<TheSettingsBio />
		</div>
	</div>
</template>
