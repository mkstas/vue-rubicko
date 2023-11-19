<script setup>
	import { onBeforeMount, ref, watch } from 'vue'
	import { useRoute } from 'vue-router'
	import { useNewsStore } from '../../stores/news'
	import { BaseLoader } from '../base'
	import ArticleItem from '../article/ArticleItem.vue'

	const articles = ref([])
	const isLoading = ref(false)
	const route = useRoute()
	const newsStore = useNewsStore()

	const getArticles = async () => {
		try {
			isLoading.value = true

			await newsStore.getArticles()


			articles.value = route.query.tag
				? newsStore.articles.filter(article => article.tagId._id === route.query.tag).reverse()
				: newsStore.articles.reverse()

			isLoading.value = false
		} catch (error) {
			isLoading.value = false
		}
	}

	watch(
		() => route.query.tag,
		() => {
			getArticles()
		}
	)

	onBeforeMount(() => getArticles())
</script>

<template>
	<BaseLoader class="mx-auto" v-if="isLoading" />
	<div class="grid gap-4" v-if="!isLoading">
		<ArticleItem
			v-for="article in articles"
			:key="article._id"
			:articleData="article"
		/>
	</div>
</template>
