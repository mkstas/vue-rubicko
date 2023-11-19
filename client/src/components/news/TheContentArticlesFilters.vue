<script setup>
	import { onBeforeMount } from 'vue'
	import { RouterLink } from 'vue-router'
	import { useTagStore } from '../../stores/tag'

	const tagStore = useTagStore()

	onBeforeMount(async () => {
		await tagStore.get()
	})
</script>

<template>
	<div class="p-4 bg-white shadow rounded-2xl sticky top-20">
		<div>
			<h3 class="mb-4 text-xl font-medium text-slate-900">Теги</h3>
			<ul>
				<li class="w-full mb-2">
					<RouterLink
						class="block py-2 px-4 hover:bg-slate-200 rounded-full transition-colors"
						to="news?cat=articles"
					>
						Все тэги
					</RouterLink>
				</li>

				<li
					class="w-full mb-2"
					v-for="tag in tagStore.tags"
				>
					<RouterLink
						class="block py-2 px-4 hover:bg-slate-200 rounded-full transition-colors"
						:to="`news?cat=articles&tag=${tag._id}`"
					>
						# {{ tag.title }}
					</RouterLink>
				</li>
			</ul>
		</div>
	</div>
</template>
