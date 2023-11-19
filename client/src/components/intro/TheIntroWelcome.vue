<script setup>
	import { IntroCard } from './base'
</script>

<template>
	<IntroCard>
		<div class="flex items-center gap-4 md:gap-8">
			<img class="select-none pointer-events-none" width="80" height="80" src="/icons/logo-light.svg" alt="Логотип Рубико">
			<h1 class="font-bold text-4xl lg:text-5xl text-white">Rubicko</h1>
		</div>
		<p class="text-2xl lg:text-4xl font-medium text-white">Место, где вы можете создавать небольшие веб-приложения</p>
	</IntroCard>
</template>
