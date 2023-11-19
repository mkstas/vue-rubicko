<script setup>
	import { computed } from 'vue'

	const props = defineProps({
		userData: {
			type: Object,
			required: true
		}
	})

	const src = computed(() => {
		return props.userData.avatarUrl ? import.meta.env.VITE_APP_BACKEND_URL + props.userData.avatarUrl : false
	})
</script>

<template>
	<div class="relative w-full pt-[calc(100%-4px)] bg-white shadow rounded-full overflow-hidden">
		<div class="flex items-center justify-center absolute top-0 bottom-0 right-0 left-0">
			<svg v-if="!src" xmlns="http://www.w3.org/2000/svg" class="fill-slate-500" width="64" height="64" viewBox="0 0 256 256">
				<path d="M230.92 212c-15.23-26.33-38.7-45.21-66.09-54.16a72 72 0 1 0-73.66 0c-27.39 8.94-50.86 27.82-66.09 54.16a8 8 0 1 0 13.85 8c18.84-32.56 52.14-52 89.07-52s70.23 19.44 89.07 52a8 8 0 1 0 13.85-8ZM72 96a56 56 0 1 1 56 56a56.06 56.06 0 0 1-56-56Z"/>
			</svg>
			<img class="object-cover w-full h-full" alt="Аватар" v-if="src" :src="src">
		</div>
	</div>
</template>
