<script setup>
	import { ref, watch, computed, onBeforeMount } from 'vue'
	import { useRoute } from 'vue-router'
	import { useUserStore } from '../stores/user'
	import { useProjectStore } from '../stores/project'

	import { BaseLoader } from '../components/base'
	import TheProjectList from '../components/project/TheProjectList.vue'
	import TheProjectTitle from '../components/project/TheProjectTitle.vue'

	const isLoading = ref(false)
	const isAuth = ref(false)

	const userStore = useUserStore()
	const projectStore = useProjectStore()
	const route = useRoute()

	const fetchData = async () => {
		try {
			isLoading.value = true

			const userData = await userStore.get(route.params.username)
			await projectStore.get(userData._id)
			isAuth.value = userStore.userData._id === userData._id

			isLoading.value = false
		} catch (error) {
			isLoading.value = false
		}
	}

	watch(
		() => route.params.username,
		() => fetchData()
	)

	onBeforeMount(() => fetchData())
</script>

<template>
	<BaseLoader class="mx-auto my-10" v-if="isLoading" />
	<section class="grid gap-8" v-if="!isLoading">
		<TheProjectTitle :isAuth="isAuth" />
		<TheProjectList :projects="projectStore.projects" />
	</section>
</template>
