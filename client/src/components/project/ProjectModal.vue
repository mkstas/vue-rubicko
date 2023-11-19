<script setup>
	import { ref } from 'vue'
	import { useRouter } from 'vue-router'
	import { useProjectStore } from '../../stores/project'
	import { BaseModal, BaseInput, BaseLabel, BaseButton } from '../base'

	const projectTitle = ref('')
	const error = ref('')
	const projectStore = useProjectStore()
	const router = useRouter()

	const emits = defineEmits(['close'])
	const closeModal = () => emits('close')

	const createProject = async () => {
		const response = await projectStore.create(projectTitle.value)

		if (response) {
			error.value = response[0].msg
			return
		}

		router.push(`/editor/${projectStore.projectData._id}`)
	}
</script>

<template>
	<BaseModal title="Создание проекта" @close="closeModal">
		<form class="grid gap-4" method="post" @submit.prevent="createProject">
			<div class="grid">
				<BaseLabel text="Название проекта" for="title" />
				<BaseInput class="w-full" id="title" type="text" v-model="projectTitle" />
				<p class="text-red-500" v-if="error">{{ error }}</p>
			</div>
			<BaseButton class="justify-self-start">
				Создать
			</BaseButton>
		</form>
	</BaseModal>
</template>
