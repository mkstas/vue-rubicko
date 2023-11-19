<script setup>
	defineProps({
		modelValue: {
			type: String,
			required: true
		}
	})

	const emit = defineEmits(['update:modelValue'])

	const updateData = (event) => {
		emit('update:modelValue', event.target.value)
	}
</script>

<template>
	<input class="w-full py-2 lg:py-4 px-4 lg:px-8 outline-none rounded-2xl bg-slate-600/30 text-xl text-white placeholder:text-slate-400/75" :value="modelValue" @input="updateData">
</template>
