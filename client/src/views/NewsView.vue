<script setup>
	import { onBeforeMount, watch } from 'vue';
	import { useRoute, useRouter } from 'vue-router'

	import TheNewsNav from '../components/news/TheNewsNav.vue'
	import TheNewsContent from '../components/news/TheNewsContent.vue'

	const router = useRouter()
	const route = useRoute()

	const addCategory = () => {
		if (!route.query.cat) {
			router.push('/news?cat=articles')
		}
	}

	watch(
		() => route.query.cat,
		() => addCategory()
	)

	onBeforeMount(() => addCategory())
</script>

<template>
	<div class="grid gap-8">
		<div class="grid gap-4">
			<h1 class="text-2xl text-slate-900 font-bold">Новости</h1>
			<TheNewsNav />
		</div>
		<TheNewsContent />
	</div>
</template>
