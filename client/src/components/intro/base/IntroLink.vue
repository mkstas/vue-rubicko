<script setup>
	import { RouterLink } from 'vue-router'

	defineProps({
		url: {
			type: String,
			default() {
				return ''
			}
		}
	})
</script>

<template>
	<RouterLink class="text-xl text-white hover:underline focus:underline outline-none" :to="url">
		<slot></slot>
	</RouterLink>
</template>
