<script setup>
	import { computed, onBeforeMount } from 'vue'
	import { useRouter } from 'vue-router'

	import { useUserStore } from '../../stores/user'
	import { BaseButton } from '../base'
	import HeaderMenuLink from './HeaderMenuLink.vue'

	const userStore = useUserStore()
	const router = useRouter()

	const logout = () => {
		userStore.logout()
		router.push('/')
	}

	const profileUrl = computed(() => `/${userStore.userData.userName}`)
	const projectsUrl = computed(() => `/${userStore.userData.userName}/projects`)
	const articlesUrl = computed(() => `/${userStore.userData.userName}/articles`)

	onBeforeMount(async () => await userStore.getMe())
</script>

<template>
	<nav class="absolute top-[calc(100%+1rem)] right-0 p-4 w-72 bg-white shadow rounded-2xl">
		<ul>
			<HeaderMenuLink :url="profileUrl" label="Мой профиль" />
			<HeaderMenuLink :url="projectsUrl" label="Мои проекты" />
			<HeaderMenuLink :url="articlesUrl" label="Мои статьи" />
			<HeaderMenuLink url="/news" label="Новости" />
		</ul>
		<hr class="bg-slate-200 my-2">
		<ul>
			<HeaderMenuLink url="/settings" label="Настройки" />
		</ul>
		<hr class="bg-slate-200 my-2">
		<ul>
			<li>
				<BaseButton class="w-full" @click="logout">
					Выйти
				</BaseButton>
			</li>
		</ul>
	</nav>
</template>
