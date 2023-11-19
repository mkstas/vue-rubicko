<script setup>
	import { computed } from 'vue'

	const props = defineProps({
		color: {
			type: String,
			default() {
				return 'green'
			}
		}
	})

	const classes = computed(() => {
		switch (props.color) {
			case 'green':
				return 'bg-green-500 hover:bg-green-600 focus-visible:bg-green-600 active:bg-green-700 text-white'
			case 'red':
				return 'bg-red-500 hover:bg-red-600 focus-visible:bg-red-600 active:bg-red-700 text-white'
		}
	})
</script>

<template>
	<button :class="'px-4 py-1 outline-none font-medium shadow rounded-2xl transition-colors ' + classes">
		<slot></slot>
	</button>
</template>
