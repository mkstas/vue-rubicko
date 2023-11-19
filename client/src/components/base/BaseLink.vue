<script setup>
	import { RouterLink } from 'vue-router'

	defineProps({
		url: {
			type: String,
			required: true
		}
	})
</script>

<template>
	<RouterLink
		class="text-blue-600 hover:underline focus-visible:underline outline-none"
		:to="url"
	>
		<slot></slot>
	</RouterLink>
</template>
