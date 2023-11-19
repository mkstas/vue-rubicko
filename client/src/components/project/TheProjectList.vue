<script setup>
	import { computed } from 'vue';
	import ProjectNotFound from './ProjectNotFound.vue'
	import ProjectItem from './ProjectItem.vue'

	const props = defineProps({
		projects: {
			type: Array,
			default() {
				return []
			}
		}
	})

	const projectsFiltered = computed(() => props.projects.reverse())
</script>

<template>
	<ProjectNotFound v-if="projects.length < 1" />
	<div class="grid md:grid-cols-3 sm:grid-cols-2 gap-4" v-if="projects.length > 0">
		<ProjectItem
			v-for="project in projectsFiltered"
			:key="project._id"
			:data="{ ...project }"
		/>
	</div>
</template>
