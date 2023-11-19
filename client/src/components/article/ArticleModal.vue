<script setup>
	import { useRouter } from 'vue-router'
	import { useUserStore } from '../../stores/user'
	import { useArticleStore } from '../../stores/article'
	import { BaseModal, BaseButton } from '../base'

	const userStore = useUserStore()
	const articletStore = useArticleStore()
	const router = useRouter()

	const emits = defineEmits(['close'])
	const closeModal = () => emits('close')

	const remove = async () => {
		await articletStore.remove()
		router.push(`/${userStore.userData.userName}/articles`)
	}
</script>

<template>
	<BaseModal title="Удаление статьи" @close="closeModal">
		<div class="grid gap-4">
			<p class="text-slate-900">
				Удалить статью
				<span class="font-bold">{{ articletStore.articleData.title }} </span>
				?
			</p>
			<BaseButton class="justify-self-start" color="red" @click="remove">
				Удалить
			</BaseButton>
		</div>
	</BaseModal>
</template>
