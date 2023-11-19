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
		<RouterLink class="block py-1 text-slate-900 hover:underline focus-visible:underline outline-none" :to="url">
			{{ label }}
		</RouterLink>
	</li>
</template>
