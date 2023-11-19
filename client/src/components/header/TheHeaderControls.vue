<script setup>
	import { ref } from 'vue'
	import TheHeaderDots from './TheHeaderDots.vue'
	import TheHeaderMenu from './TheHeaderMenu.vue'

	const isOpen = ref(false)

	const switchMenu = () => {
		isOpen.value = !isOpen.value
	}
</script>

<template>
	<div class="relative -my-2">
		<TheHeaderDots @click="switchMenu" />
		<TheHeaderMenu v-if="isOpen" />
	</div>
</template>
