<script setup>
	import { computed } from 'vue'
	import NewsNavItem from './NewsNavItem.vue'
	import { useRoute } from 'vue-router'

	const route = useRoute();
</script>

<template>
	<div class="flex gap-2">
		<NewsNavItem label="Статьи" url="/news?cat=articles" :active="route.query.cat === 'articles'" />
		<NewsNavItem label="Проекты" url="/news?cat=projects" :active="route.query.cat === 'projects'" />
	</div>
</template>
