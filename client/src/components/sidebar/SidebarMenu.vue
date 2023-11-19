<script setup>
	import { computed, onBeforeMount } from 'vue'
	import { useUserStore } from '../../stores/user'
	import SidebarMenuItem from './SidebarMenuItem.vue'

	const userStore = useUserStore()
	const profileUrl = computed(() => `/${userStore.userData.userName}`)
	const projectsUrl = computed(() => `/${userStore.userData.userName}/projects`)
	const articlesUrl = computed(() => `/${userStore.userData.userName}/articles`)

	onBeforeMount(async () => await userStore.getMe())
</script>

<template>
	<ul>
		<SidebarMenuItem :url="profileUrl" label="Мой профиль" />
		<SidebarMenuItem :url="projectsUrl" label="Мои проекты" />
		<SidebarMenuItem :url="articlesUrl" label="Мои статьи" />
		<SidebarMenuItem url="/news" label="Новости" />
	</ul>
	<hr class="bg-slate-200 my-2">
	<ul>
		<SidebarMenuItem url="/settings" label="Настройки" />
	</ul>
</template>
