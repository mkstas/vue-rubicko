<script setup>
	defineProps({
		modelValue: {
			type: String,
			required: true
		}
	})

	const emit = defineEmits(['update:modelValue'])

	const update = (event) => {
		emit('update:modelValue', event.target.value)
	}
</script>

<template>
	<input
		class="py-2 px-4 shadow bg-white rounded-2xl outline-none text-base text-slate-900"
		@value="modelValue"
		@input="update"
	>
</template>
