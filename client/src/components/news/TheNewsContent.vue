<script setup>
	import { useRoute } from 'vue-router'
	import TheNewsContentArticles from './TheNewsContentArticles.vue'
	import TheNewsContentProjects from './TheNewsContentProjects.vue'
	import TheContentArticlesFilters from './TheContentArticlesFilters.vue'

	const route = useRoute()
</script>

<template>
	<div class="grid md:grid-cols-[4fr_2fr] gap-4 items-start">
		<template v-if="route.query.cat === 'articles'">
			<TheNewsContentArticles />
			<TheContentArticlesFilters />
		</template>

		<TheNewsContentProjects v-if="route.query.cat === 'projects'" />
	</div>
</template>
