<script setup>
	import { computed } from 'vue'
	import { useUserStore } from '../../stores/user'
	import { BaseLink } from '../base'

	const props = defineProps({
		userData: {
			type: Object,
			required: true
		}
	})

	const userStore = useUserStore()

	const userName = computed(() => props.userData.userName)
	const fullName = computed(() => props.userData.fullName)
	const userBio = computed(() => props.userData.userBio)
</script>

<template>
	<div class="grid gap-2">
		<div class="grid sm:gap-1">
			<h1 class="text-2xl sm:text-3xl text-slate-900 font-bold">{{ userName }}</h1>
			<p class="text-lg sm:text-xl text-slate-900 font-medium" v-if="fullName">{{ fullName }}</p>
			<p class="text-sm sm:text-base text-slate-900" v-if="userBio">{{ userBio }}</p>
		</div>

		<BaseLink url="/settings" v-if="userStore.isAuth">
			Редактировать
		</BaseLink>
	</div>
</template>
