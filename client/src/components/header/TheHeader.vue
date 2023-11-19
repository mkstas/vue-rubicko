<script setup>
	import { BaseLogo } from '../base'
	import TheHeaderControls from './TheHeaderControls.vue'
</script>

<template>
	<header class="py-2 bg-slate-800 fixed top-0 left-0 right-0 z-10">
		<div class="container flex justify-between">
			<BaseLogo />
			<TheHeaderControls />
		</div>
	</header>
</template>
