<script setup>
import { computed } from 'vue'

	const props = defineProps({
		articleData: {
			type: Object,
			required: true
		}
	})

	const src = computed(() => import.meta.env.VITE_APP_BACKEND_URL + props.articleData.imageUrl)
	const alt = computed(() => props.articleData.title)
</script>

<template>
	<div class="relative pb-[36%] rounded-2xl shadow overflow-hidden">
		<img class="absolute top-0 left-0 w-full h-full object-cover" width="936" height="337" :src="src" :alt="alt">
	</div>
</template>
