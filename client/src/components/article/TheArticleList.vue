<script setup>
	import { computed } from 'vue';
	import ArticleNotFound from './ArticleNotFound.vue'
	import ArticleItem from './ArticleItem.vue'

	const props = defineProps({
		articles: {
			type: Array,
			default() {
				return []
			}
		}
	})

	const articlesFiltered = computed(() => props.articles.reverse())
</script>

<template>
	<ArticleNotFound v-if="articles.length < 1" />
	<div class="grid max-w-xl gap-4" v-if="articles.length > 0">
		<ArticleItem
			v-for="article in articlesFiltered"
			:key="article._id"
			:articleData="{ ...article }"
		/>
	</div>
</template>
