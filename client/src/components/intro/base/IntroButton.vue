<script setup>
	defineProps({
		text: {
			type: String,
			default() {
				return ''
			}
		}
	})
</script>

<template>
	<button class="py-2 lg:py-4 lg:px-8 px-4 outline-none rounded-2xl bg-green-500 hover:bg-green-600 focus-visible:bg-green-600 active:bg-green-700 text-xl text-white transition-colors">
		{{ text }}
	</button>
</template>
