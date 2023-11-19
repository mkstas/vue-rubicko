<script setup>
	import { ref, watch, onBeforeMount } from 'vue'
	import { useRoute } from 'vue-router'
	import { useUserStore } from '../stores/user'
	import { useArticleStore } from '../stores/article'

	import { BaseLoader } from '../components/base'
	import TheArticleList from '../components/article/TheArticleList.vue'
	import TheArticleListTitle from '../components/article/TheArticleListTitle.vue'

	const isLoading = ref(false)
	const isAuth = ref(false)

	const userStore = useUserStore()
	const articleStore = useArticleStore()
	const route = useRoute()

	const fetchData = async () => {
		try {
			isLoading.value = true

			const userData = await userStore.get(route.params.username)
			await articleStore.get(userData._id)
			isAuth.value = userStore.userData._id === userData._id

			isLoading.value = false
		} catch (error) {
			isLoading.value = false
		}
	}

	watch(
		() => route.params.username,
		() => fetchData()
	)

	onBeforeMount(() => fetchData())
</script>

<template>
	<BaseLoader class="mx-auto my-10" v-if="isLoading" />
	<section class="grid gap-8" v-if="!isLoading">
		<TheArticleListTitle :isAuth="isAuth" />
		<TheArticleList :articles="articleStore.articles" />
	</section>
</template>
