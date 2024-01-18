<script setup>
import { defineModel } from 'vue'

const props = defineProps({
	title: {
		type: String,
		required: true
	}
})
const internalValue = defineModel()
</script>

<template>
	<div class="flex items-center">
		<h3 class="block w-1/2">{{ props.title }}</h3>
		<input
			v-model.number="internalValue"
			class="border-b border-black min-w-[20px] outline-none opacity-none bg-transparent text-center dark:border-white"
			:style="{ width: `${Math.min(20, String(internalValue).length)}ch` }"
			type="number"
			min="0"
		/>
	</div>
</template>
