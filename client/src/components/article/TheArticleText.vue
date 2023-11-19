<script setup>
	import { computed } from 'vue'

	const props = defineProps({
		text: {
			type: String,
			required: true
		}
	})

	const paragraphs = computed(() => props.text.split('\n').filter(item => item.trim() && item))
</script>

<template>
	<div class="grid gap-4">
		<p
			class=" text-lg"
			v-for="paragraph in paragraphs"
		>{{ paragraph }}</p>
	</div>
</template>
