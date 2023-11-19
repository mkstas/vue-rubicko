<script setup>
	import { RouterLink } from 'vue-router'

	defineProps({
		url: {
			type: String,
			default() {
				return '/'
			}
		},
		label: {
			type: String,
			default() {
				return ''
			}
		}
	})
</script>

<template>
	<li>
		<RouterLink
			class="block py-1 px-4 outline-none text-slate-600
				hover:bg-slate-200 focus-visible:bg-slate-200 rounded-2xl"
			:to="url"
		>
			{{ label }}
		</RouterLink>
	</li>
</template>
