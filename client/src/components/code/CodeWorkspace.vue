<script setup>
	import { VAceEditor } from 'vue3-ace-editor'

	import 'ace-builds/src-min-noconflict/mode-html'
	import 'ace-builds/src-min-noconflict/mode-css'
	import 'ace-builds/src-min-noconflict/mode-javascript'
	import 'ace-builds/src-min-noconflict/snippets/html'
	import 'ace-builds/src-min-noconflict/snippets/css'
	import 'ace-builds/src-min-noconflict/snippets/javascript'
	import 'ace-builds/src-min-noconflict/theme-cloud9_night_low_color'
	import 'ace-builds/src-min-noconflict/ext-language_tools'

	const options = {
		fontSize: 14,
		tabSize: 2,
		enableBasicAutocompletion: true,
		enableSnippets: true
	}

	defineProps({
		label: {
			type: String,
			required: false
		},
		lang: {
			type: String,
			required: true
		},
		modelValue: {
			type: String,
			required: false,
			default() {
				return ''
			}
		}
	})

	const emit = defineEmits(['update:modelValue'])
	const update = (value) => emit('update:modelValue', value)
</script>

<template>
	<div class="bg-[#303130]">
		<div class="flex">
			<div class="border-b-2 border-r-2 border-neutral-700"></div>
			<h2 class="px-3 py-1 text-white inline-block border-t-2 border-neutral-700">{{ label }}</h2>
			<div class="w-full border-b-2 border-l-2 border-neutral-700"></div>
		</div>

		<VAceEditor
			class="h-48 lg:h-80 border-l-2 border-neutral-700"
			theme="cloud9_night_low_color"
			:lang="lang"
			:options="options"
			:value="modelValue"
			@update:value="update"
		/>
	</div>
</template>
