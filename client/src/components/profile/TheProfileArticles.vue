<script setup>
	import { computed } from 'vue'
	import { useRouter, useRoute } from 'vue-router'

	import { useUserStore } from '../../stores/user'
	import { useArticleStore } from '../../stores/article'

	import { BaseButton, BaseLink } from '../base'
	import ArticleItem from '../article/ArticleItem.vue'
	import ArticleNotFound from '../article/ArticleNotFound.vue'

	const router = useRouter()
	const route = useRoute()

	const userStore = useUserStore()
	const articleStore = useArticleStore()

	const articles = computed(() => articleStore.articles.reverse().filter((item, index) => index < 2))
	const articlesUrl = computed(() => `/${route.params.username}/articles`)

	const goToArticleEditor = () => {
		router.push('/article/editor')
	}
</script>

<template>
	<section class="grid gap-6">
		<header class="flex items-center justify-between">
			<h2 class="text-xl sm:text-2xl text-slate-900 font-semibold">Статьи</h2>
			<BaseButton v-if="userStore.isAuth" @click="goToArticleEditor">
				Создать статью
			</BaseButton>
		</header>
		<ArticleNotFound v-if="articles.length < 1" />
		<div class="grid gap-4" v-if="articles.length > 0">
			<ArticleItem
				v-for="article in articles"
				:key="article._id"
				:articleData="{ ...article }"
			/>
		</div>
		<BaseLink :url="articlesUrl" v-if="articles.length > 0">
			Смотреть все статьи
		</BaseLink>
	</section>
</template>
