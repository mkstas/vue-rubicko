<script setup>
	import { ref } from 'vue'
	import { BaseButton } from '../base'
	import ProjectModal from './ProjectModal.vue'

	defineProps({
		isAuth: {
			type: Boolean,
			default() {
				return false
			}
		}
	})

	const isOpen = ref(false)

	const openModal = () => isOpen.value = true
	const closeModal = () => isOpen.value = false
</script>

<template>
	<header class="flex items-center justify-between">
		<h1 class="text-2xl text-slate-900 font-bold">Проекты</h1>
		<BaseButton @click="openModal" v-if="isAuth">
			Создать проект
		</BaseButton>
		<ProjectModal @close="closeModal" v-if="isOpen" />
	</header>
</template>
