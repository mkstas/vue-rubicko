<script setup>
	import { BaseButton } from '../base'
	import { useRouter } from 'vue-router'

	defineProps({
		isAuth: {
			type: Boolean,
			default() {
				return false
			}
		}
	})

	const router = useRouter()

	const goToArticleEditor = () => {
		router.push('/article/editor')
	}
</script>

<template>
	<header class="flex items-center justify-between">
		<h1 class="text-2xl text-slate-900 font-bold">Статьи</h1>
		<BaseButton @click="goToArticleEditor" v-if="isAuth">
			Создать статью
		</BaseButton>
	</header>
</template>
