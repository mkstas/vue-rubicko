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
	<label class="pb-1 text-base text-slate-900">
		{{ text }}
	</label>
</template>
