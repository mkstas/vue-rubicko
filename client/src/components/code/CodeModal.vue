<script setup>
	import { useRouter } from 'vue-router'
	import { useUserStore } from '../../stores/user'
	import { useProjectStore } from '../../stores/project'
	import { BaseModal, BaseButton } from '../base'

	const userStore = useUserStore()
	const projectStore = useProjectStore()
	const router = useRouter()

	const emits = defineEmits(['close'])
	const closeModal = () => emits('close')

	const remove = async () => {
		await projectStore.remove()
		router.push(`/${userStore.userData.userName}/projects`)
	}
</script>

<template>
	<BaseModal title="Удаление проекта" @close="closeModal">
		<div class="grid gap-4">
			<p class="text-slate-900">
				Удалить проект
				<span class="font-bold">{{ projectStore.projectData.title }} </span>
				?
			</p>
			<BaseButton class="justify-self-start" color="red" @click="remove">
				Удалить
			</BaseButton>
		</div>
	</BaseModal>
</template>
