<script setup>
	import { BaseLogo } from '../base'
	import TheHeaderControls from '../header/TheHeaderControls.vue'
	import TheCodeTools from './TheCodeTools.vue'

	defineProps({
		isAuth: {
			type: Boolean,
			required: true
		}
	})
</script>

<template>
	<header class="py-2 px-3 grid grid-cols-[1fr_10fr_1fr] items-center bg-slate-800 relative z-10">
		<BaseLogo />
		<TheCodeTools class="justify-self-center" :isAuth="isAuth" />
		<TheHeaderControls class="justify-self-end" />
	</header>
</template>
