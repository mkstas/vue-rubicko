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
	<h2 class="font-medium text-3xl text-white">
		{{ text }}
	</h2>
</template>
