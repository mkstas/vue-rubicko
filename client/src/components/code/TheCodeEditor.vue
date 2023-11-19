<script setup>
	import { computed } from 'vue'
	import { useProjectStore } from '../../stores/project'
	import CodeWorkspace from './CodeWorkspace.vue'

	const projectStore = useProjectStore()
	const projectData = computed(() => projectStore.projectData)
</script>

<template>
	<div class="lg:grid lg:grid-cols-3">
		<CodeWorkspace
			label="HTML"
			lang="html"
			v-model="projectData.html"
		/>
		<CodeWorkspace
			label="CSS"
			lang="css"
			v-model="projectData.css"
		/>
		<CodeWorkspace
			label="JavaScript"
			lang="javascript"
			v-model="projectData.javaScript"
		/>
	</div>
</template>
