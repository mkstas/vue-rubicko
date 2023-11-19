<script setup>
	import { computed } from 'vue'
	import { useProjectStore } from '../../stores/project'

	const projectStore = useProjectStore()

	const html = computed(() => projectStore.projectData.html)
	const css = computed(() => '<style>' + projectStore.projectData.css + '</style>')
	const javaScript = computed(() => '<s' + 'cript>' + projectStore.projectData.javaScript + '</s' + 'cript>')

	const srcDoc = computed(() => '<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta http-equiv="X-UA-Compatible" content="IE=edge"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Preview</title>' + css.value + '</head><body>' + html.value + javaScript.value + '</body></html>')
</script>

<template>
	<div class="bg-white">
		<iframe class="w-full h-full border-none" title="preview" :srcdoc="srcDoc"></iframe>
	</div>
</template>
