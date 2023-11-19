<script setup>
	import { ref, computed } from 'vue'
	import { useProjectStore } from '../../stores/project'
	import CodeModal from './CodeModal.vue'

	defineProps({
		isAuth: {
			type: Boolean,
			required: true
		}
	})

	const isOpen = ref(false)
	const isOpenModal = ref(false)
	const projectStore = useProjectStore()

	const title = computed(() => projectStore.projectData.title)
	const classes = computed(() => isOpen.value ? 'fill-white rotate-180' : 'fill-white')

	const switchMenu = () => isOpen.value = !isOpen.value

	const openModal = () => {
		isOpen.value = false
		isOpenModal.value = true
	}

	const closeModal = () => {
		isOpenModal.value = false
	}

	const save = async () => {
		await projectStore.update()
		isOpen.value = false
	}
</script>

<template>
	<div class="relative">
		<div class="flex items-center gap-2">
			<h1	h1 class="text-white font-medium">{{ title }}</h1>
			<button class="p-2" @click="switchMenu" v-if="isAuth">
				<svg :class="classes" width="8" height="5" viewBox="0 0 8 5" xmlns="http://www.w3.org/2000/svg">
					<path d="M3.22307 4.67391L0.339114 1.84783C-0.0121368 1.50362 -0.090521 1.10978 0.103961 0.666304C0.298443 0.222826 0.644887 0.000724638 1.14329 0H6.85574C7.35488 0 7.7017 0.222101 7.89618 0.666304C8.09066 1.11051 8.01191 1.50435 7.65992 1.84783L4.77596 4.67391C4.66504 4.78261 4.54488 4.86413 4.41547 4.91848C4.28606 4.97283 4.14741 5 3.99952 5C3.85162 5 3.71297 4.97283 3.58356 4.91848C3.45415 4.86413 3.33399 4.78261 3.22307 4.67391Z"/>
				</svg>
			</button>
		</div>

		<ul class="absolute top-[calc(100%+2rem)] left-1/2 -translate-x-1/2 bg-white p-4 w-40 rounded-2xl" v-if="isOpen">
			<li>
				<button class="w-full py-1 text-start text-slate-900 cursor-pointer hover:underline" @click="save">Сохранить</button>
			</li>
			<li>
				<button class="w-full py-1 text-start text-slate-900 cursor-pointer hover:underline" @click="openModal">Удалить</button>
			</li>
		</ul>

		<CodeModal @close="closeModal" v-if="isOpenModal" />
	</div>
</template>
