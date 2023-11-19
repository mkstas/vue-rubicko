<script setup>
	import { ref, onBeforeMount } from 'vue'
	import { useRoute } from 'vue-router'

	import { useProjectStore } from '../stores/project'
	import { useUserStore } from '../stores/user'

	import { BaseLoader } from '../components/base'
	import TheCodeHeader from '../components/code/TheCodeHeader.vue'
	import TheCodeEditor from '../components/code/TheCodeEditor.vue'
	import TheCodePreview from '../components/code/TheCodePreview.vue'

	const isLoading = ref(false)
	const isAuth = ref(false)

	const projectStore = useProjectStore()
	const userStore = useUserStore()

	const route = useRoute()

	const fetchData = async () => {
		isLoading.value = true
		await userStore.getMe()
		await projectStore.getOne(route.params.id)
		isAuth.value = userStore.userData._id === projectStore.projectData.userId._id
		isLoading.value = false
	}

	onBeforeMount(() => fetchData())
</script>

<template>
	<TheCodeHeader :isAuth="isAuth" />
	<BaseLoader class="mx-auto my-10" v-if="isLoading" />
	<div class="grid grid-rows-[auto_1fr] h-[calc(100%-3.5rem)]" v-if="!isLoading">
		<TheCodeEditor />
		<TheCodePreview />
	</div>
</template>
