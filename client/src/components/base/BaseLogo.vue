<script setup>
	import { RouterLink } from 'vue-router'
</script>

<template>
	<RouterLink class="flex items-center gap-4" to="/news">
		<img class="select-none pointer-events-none" width="36" height="36" src="/icons/logo-light.svg" alt="">
		<span class="text-white text-xl font-medium">Rubicko</span>
	</RouterLink>
</template>
