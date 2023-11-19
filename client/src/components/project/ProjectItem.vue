<script setup>
	import { computed, onMounted, ref } from 'vue';
	import { useUserStore } from '../../stores/user'
	import { useProjectStore } from '../../stores/project'
	import { BaseLink } from '../base'

	const likes = ref(0)

	const props = defineProps({
		data: {
			type: Object,
			required: true
		}
	})

	const isLiked = ref('fill-slate-400')
	const userStore = useUserStore()
	const projectStore = useProjectStore()

	const url = computed(() => `/editor/${props.data._id}`)
	const title = computed(() => props.data.title)
	const date = computed(() => props.data.createdAt.split('T')[0])

	const like = async () => {
		await projectStore.like(props.data._id)

		if (isLiked.value === 'fill-slate-400') {
			isLiked.value = 'fill-rose-500'
			likes.value++
			return
		}

		isLiked.value = 'fill-slate-400'
		likes.value--
	}

	onMounted(() => {
		likes.value = props.data.liked.length

		props.data.liked.forEach(user => {
			if (user === userStore.userData._id) {
				isLiked.value = 'fill-rose-500'
			}
		})
	})
</script>

<template>
	<div class="px-6 py-4 grid gap-1 bg-white shadow rounded-2xl">
		<BaseLink class="font-semibold" :url="url">
			{{ title }}
		</BaseLink>
		<div class="flex justify-between">
			<time class="text-slate-900" datetime="2023-04-01">
				{{ date }}
			</time>
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
