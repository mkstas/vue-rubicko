<script setup>
	import { onBeforeMount, ref } from 'vue'
	import { useRouter } from 'vue-router'

	import { useArticleStore } from '../stores/article'
	import { useTagStore } from '../stores/tag'

	import {
		BaseLabel, BaseFile, BaseInput,
		BaseTextarea, BaseButton
	} from '../components/base'

	const articleData = ref({
		title: '',
		text: '',
		image: '',
		tagId: ''
	})

	const articleStore = useArticleStore()
	const tagStore = useTagStore()
	const router = useRouter()

	const uploadImage = (event) => {
		 articleData.value.image = event.target.files[0]
	}

	const createArticle = async () => {
		const formData = new FormData()

		formData.append('image', articleData.value.image)
		formData.append('title', articleData.value.title)
		formData.append('tagId', articleData.value.tagId)
		formData.append('text', articleData.value.text)

		await articleStore.create(formData)

		router.push(`/article/${articleStore.articleData._id}`)
	}

	onBeforeMount(async () => {
		await tagStore.get()
	})
</script>

<template>
	<div class="grid gap-8">
		<h1 class="text-2xl text-slate-900 font-bold">Создание статьи</h1>

		<form class="grid gap-4" method="post" enctype="multipart/form-data" @submit.prevent="createArticle">
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
					v-model="articleData.text"
				/>
			</div>

			<BaseButton class="justify-self-start">
				Создать
			</BaseButton>
		</form>
	</div>
</template>
