<script setup>
	import { ref, computed, onBeforeMount } from 'vue'
	import { useUserStore } from '../../stores/user'
	import { useArticleStore } from '../../stores/article'

	const isLiked = ref('fill-slate-400')

	const userStore = useUserStore()
	const articleStore = useArticleStore()

	const title = computed(() => articleStore.articleData.title)
	const tag = computed(() => articleStore.articleData.tagId.title)
	const date = computed(() => articleStore.articleData.createdAt.split('T')[0])
	const likes = computed(() => articleStore.articleData.liked.length)

	const like = async () => {
		await articleStore.likeOne(articleStore.articleData._id)

		if (isLiked.value === 'fill-slate-400') {
			return isLiked.value = 'fill-rose-500'
		}

		isLiked.value = 'fill-slate-400'
	}

	onBeforeMount(() => {
		articleStore.articleData.liked.forEach(user => {
			if (user === userStore.userData._id) {
				isLiked.value = 'fill-rose-500'
			}
		})
	})
</script>

<template>
	<div class="flex justify-between items-start gap-6">
		<div class="grid gap-2">
			<h1 class="text-2xl text-slate-900 font-bold">{{ title }}</h1>
			<p class="text-slate-500"># {{ tag }}</p>
			<time class="text-slate-900" datetime="2023-04-01">
				{{ date }}
			</time>
		</div>

		<div class="mr-2">
			<button
				class="-mx-4 -my-2 py-2 px-4 flex items-center gap-2 hover:bg-slate-200
					focus-visible:bg-slate-200 transition-colors outline-none rounded-2xl"
				@click="like"
			>
				<span class="font-medium text-slate-500">{{ likes }}</span>
				<svg :class="isLiked" width="16" height="14" viewBox="0 0 16 14" xmlns="http://www.w3.org/2000/svg">
					<path d="M11.6364 0C10.1091 0 8.76364 0.816667 8 2.1C7.23636 0.816667 5.89091 0 4.36364 0C1.96364 0 0 2.1 0 4.66667C0 9.29444 8 14 8 14C8 14 16 9.33333 16 4.66667C16 2.1 14.0364 0 11.6364 0Z"/>
				</svg>
			</button>
		</div>
	</div>
</template>
