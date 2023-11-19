<script setup>
	import { onBeforeMount, ref } from 'vue';
	import { useNewsStore } from '../../stores/news'
	import { BaseLoader } from '../base'
	import ProjectItem from '../project/ProjectItem.vue'

	const isLoading = ref(false)

	const newsStore = useNewsStore()

	const getProjects = async () => {
		try {
			isLoading.value = true
			await newsStore.getProjects()
			isLoading.value = false
		} catch (error) {
			isLoading.value = false
		}
	}

	onBeforeMount(() => getProjects())
</script>

<template>
	<BaseLoader class="mx-auto" v-if="isLoading" />
	<div class="grid gap-4 max-w-xl " v-if="!isLoading">
		<ProjectItem
			v-for="project in newsStore.projects"
			:key="project._id"
			:data="project"
		/>
	</div>
</template>
