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
	<label class="w-full pb-2 text-xl text-white">
		{{ text }}
	</label>
</template>
