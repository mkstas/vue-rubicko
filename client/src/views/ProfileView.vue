<script setup>
	import { ref, watch, onBeforeMount } from 'vue'
	import { useRoute } from 'vue-router'

	import { useUserStore } from '../stores/user'
	import { useProjectStore } from '../stores/project'
	import { useArticleStore } from '../stores/article'

	import { BaseLoader } from '../components/base'
	import TheProfile from '../components/profile/TheProfile.vue'
	import TheProfileProjects from '../components/profile/TheProfileProjects.vue'
	import TheProfileArticles from '../components/profile/TheProfileArticles.vue'

	const userData = ref({})
	const isLoading = ref(false)

	const route = useRoute()

	const userStore = useUserStore()
	const projectStore = useProjectStore()
	const articleStore = useArticleStore()

	const fetchData = async () => {
		try {
			isLoading.value = true

			userData.value = await userStore.get(route.params.username)
			await projectStore.get(userData.value._id)
			await articleStore.get(userData.value._id)

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
	<div class="grid gap-8 md:grid-cols-[4fr_8fr] md:items-start" v-if="!isLoading">
		<TheProfile :userData="userData" />
		<div class="grid gap-8">
			<TheProfileProjects :userData="userData" />
			<TheProfileArticles />
		</div>
	</div>
</template>
