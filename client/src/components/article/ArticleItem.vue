<script setup>
	import { ref, computed, onMounted } from 'vue'
	import { RouterLink } from 'vue-router'

	import { useUserStore } from '../../stores/user'
	import { useArticleStore } from '../../stores/article'

	import ArticleItemTitle from './ArticleItemTitle.vue'

	const likes = ref(0)

	const props = defineProps({
		articleData: {
			type: Object,
			required: true
		}
	})

	const isLiked = ref('fill-slate-400')
	const userStore = useUserStore()
	const articleStore = useArticleStore()

	const src = computed(() => {
		return props.articleData.imageUrl ? import.meta.env.VITE_APP_BACKEND_URL + props.articleData.imageUrl : false
	})

	const href = computed(() => `/article/${props.articleData._id}`)
	const date = computed(() => props.articleData.createdAt.split('T')[0])
	const text = computed(() => props.articleData.text.split(' ').slice(0, 20).join(' '))

	const like = async () => {
		await articleStore.like(props.articleData._id)

		if (isLiked.value === 'fill-slate-400') {
			likes.value++
			isLiked.value = 'fill-rose-500'
			return
		}

		likes.value--
		isLiked.value = 'fill-slate-400'
	}

	onMounted(() => {
		likes.value = props.articleData.liked.length

		props.articleData.liked.forEach(user => {
			if (user === userStore.userData._id) {
				isLiked.value = 'fill-rose-500'
			}
		})
	})
</script>

<template>
	<article class="bg-white shadow rounded-2xl overflow-hidden">
		<div class="relative pb-[40%]" v-if="src">
			<img class="absolute top-0 left-0 w-full h-full object-cover" :src="src" alt="">
		</div>
		<ArticleItemTitle
			:fullName="articleData.userId.fullName"
			:userName="articleData.userId.userName"
			:avatarUrl="articleData.userId.avatarUrl"
		/>
		<div class="grid gap-4 px-4 py-4 md:px-6">
			<RouterLink class="text-slate-900 hover:text-blue-600 transition-colors" :to="href">
				<h3 class="text-xl font-medium">
					{{ articleData.title }}
				</h3>
				<p class="text-lg">{{ text }}...</p>
			</RouterLink>

			<div class="flex justify-between">
				<div class="flex gap-4">
					<time class="text-slate-900" datetime="2023-04-01">
						{{ date }}
					</time>
					<p class="text-slate-500"># {{ articleData.tagId.title }}</p>
				</div>
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
	</article>
</template>
