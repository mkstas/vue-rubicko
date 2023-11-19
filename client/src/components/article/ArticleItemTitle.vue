<script setup>
	import { computed } from 'vue'
	import { RouterLink } from 'vue-router'

	const props = defineProps({
		fullName: {
			type: String,
			required: false,
			default() {
				return ''
			}
		},

		userName: {
			type: String,
			required: true
		},

		avatarUrl: {
			type: String,
			required: false,
			default() {
				return ''
			}
		}
	})

	const src = computed(() => {
		return props.avatarUrl ? import.meta.env.VITE_APP_BACKEND_URL + props.avatarUrl : false
	})
</script>

<template>
	<RouterLink class="px-4 pt-4 md:px-6 flex gap-4 items-center text-slate-900 hover:text-blue-600 transition-colors" :to="`/${userName}`">
		<div class="flex items-center justify-center w-10 h-10 bg-white shadow rounded-full">
			<img class="w-10 h-10 object-cover rounded-full" :src="src" alt="" v-if="src">
			<svg v-if="!src" xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 fill-slate-500" width="64" height="64" viewBox="0 0 256 256">
				<path d="M230.92 212c-15.23-26.33-38.7-45.21-66.09-54.16a72 72 0 1 0-73.66 0c-27.39 8.94-50.86 27.82-66.09 54.16a8 8 0 1 0 13.85 8c18.84-32.56 52.14-52 89.07-52s70.23 19.44 89.07 52a8 8 0 1 0 13.85-8ZM72 96a56 56 0 1 1 56 56a56.06 56.06 0 0 1-56-56Z"/>
			</svg>
		</div>

		<div>
			<p class="font-medium">{{ userName }}</p>
			<p class="text-sm" v-if="fullName">{{ fullName }}</p>
		</div>
	</RouterLink>
</template>
