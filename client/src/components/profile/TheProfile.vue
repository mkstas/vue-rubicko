<script setup>
	import TheProfileAvatar from './TheProfileAvatar.vue'
	import TheProfileData from './TheProfileData.vue'

	defineProps({
		userData: {
			type: Object,
			required: true
		}
	})
</script>

<template>
	<section class="grid md:grid-cols-none grid-cols-[4fr_8fr] items-start gap-6">
		<TheProfileAvatar :userData="userData" />
		<TheProfileData :userData="userData" />
	</section>
</template>
