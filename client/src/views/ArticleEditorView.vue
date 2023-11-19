<script setup>
	import { onBeforeMount, ref } from 'vue'
	import { useRoute } from 'vue-router'

	import { useUserStore } from '../stores/user'
	import { useArticleStore } from '../stores/article'
	import { useTagStore } from '../stores/tag'

	import ArticleModal from '../components/article/ArticleModal.vue'

	import {
		BaseLabel, BaseFile, BaseInput,
		BaseTextarea, BaseButton
	} from '../components/base'

	const articleData = ref({
		_id: '',
		title: '',
		text: '',
		image: '',
		tagId: ''
	})

	const isOpen = ref(false)
	const successMessage = ref('')

	const userStore = useUserStore()
	const articleStore = useArticleStore()
	const tagStore = useTagStore()
	const route = useRoute()

	const openModal = () => isOpen.value = true
	const closeModal = () => isOpen.value = false

	const uploadImage = (event) => {
		 articleData.value.image = event.target.files[0]
	}

	const updateArticle = async () => {
		const formData = new FormData()

		if (articleData.value.image) {
			formData.append('image', articleData.value.image)
		}

		formData.append('title', articleData.value.title)
		formData.append('text', articleData.value.text)
		formData.append('tagId', articleData.value.tagId)

		const response = await articleStore.update(articleData.value._id, formData)

		if (response.success) {
			successMessage.value = response.message
		}
	}

	const fetchData = async () => {
		await userStore.getMe()
		await articleStore.getOne(route.params.id)
		await tagStore.get()
	}

	onBeforeMount(async () => {
		await fetchData()

		articleData.value._id = articleStore.articleData._id
		articleData.value.title = articleStore.articleData.title
		articleData.value.text = articleStore.articleData.text
		articleData.value.tagId = articleStore.articleData.tagId._id
	})
</script>

<template>
	<div class="grid gap-8">
		<h1 class="text-2xl text-slate-900 font-bold">Редактирование статьи</h1>
		<p class="text-green-500" v-if="successMessage">{{ successMessage }}</p>

		<form class="grid gap-4" method="post" enctype="multipart/form-data" @submit.prevent="updateArticle">
			<div class="grid max-w-md">
				<BaseLabel text="Заставка статьи" for="preview" />
				<BaseFile
					id="preview"
					name="image"
					@input="uploadImage"
				/>
			</div>
			<div class="grid max-w-md">
				<BaseLabel text="Заголовок статьи" for="title" />
				<BaseInput
					type="text"
					id="title"
					name="title"
					:value="articleData.title"
					v-model="articleData.title"
				/>
			</div>
			<div class="grid max-w-md">
				<BaseLabel text="Тег статьи" for="tag" />
				<select
					class="py-2 px-4 shadow bg-white rounded-2xl text-base text-slate-900"
					name="tag"
					id="tag"
					v-model="articleData.tagId"
				>
					<option
						v-for="tag in tagStore.tags"
						:key="tag._id"
						:value="tag._id"
					>
						{{ tag.title }}
					</option>
				</select>
			</div>
			<div class="grid">
				<BaseLabel text="Содержание статьи" for="content" />
				<BaseTextarea
					id="content"
					rows="10"
					name="content"
					:value="articleData.text"
					v-model="articleData.text"
				/>
			</div>

			<div class="flex gap-4">
				<BaseButton class="justify-self-start">
					Обновить
				</BaseButton>
				<BaseButton
					class="justify-self-start"
					color="red"
					type="button"
					@click="openModal"
				>
					Удалить
				</BaseButton>
			</div>
		</form>
	</div>

	<ArticleModal @close="closeModal" v-if="isOpen" />
</template>
