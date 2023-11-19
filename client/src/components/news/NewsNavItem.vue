<script setup>
	import { computed } from 'vue'

	const props = defineProps({
		label: {
			type: String,
			required: true
		},

		active: {
			type: Boolean,
			required: true
		},

		url: {
			type: String,
			required: true
		}
	})

	const classes = computed(() => {
		return props.active
			? 'px-4 py-1 text-sm text-white bg-green-500 shadow rounded-full'
			: 'px-4 py-1 text-sm text-slate-900 bg-white hover:bg-green-300 shadow rounded-full transition-colors'
	})
</script>

<template>
	<RouterLink :to="url" :class="classes">
		{{ label }}
	</RouterLink>
</template>
