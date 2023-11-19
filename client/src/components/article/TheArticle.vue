<script setup>
	import { ref, computed, onBeforeMount } from 'vue'

	import { useUserStore } from '../../stores/user'
	import { useArticleStore } from '../../stores/article'

	import TheArticleTitle from './TheArticleTitle.vue'

	const isLiked = ref('fill-slate-400')

	const userStore = useUserStore()
	const articleStore = useArticleStore()

	const paragraphs = computed(() => articleStore.articleData.text.split('\n'))

	onBeforeMount(() => {
		articleStore.articleData.liked.forEach(user => {
			if (user === userStore.userData._id) {
				isLiked.value = 'fill-rose-500'
			}
		})
	})
</script>

<template>
	<div class="grid gap-4">
		<div>
			<TheArticleTitle />
		</div>

		<div class="grid gap-4">
			<p
				class=" text-lg"
				v-for="paragraph in paragraphs"
			>{{ paragraph }}</p>
		</div>
	</div>
</template>
