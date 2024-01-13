<script setup>
import { ref } from 'vue'

const props = defineProps({
	title: {
		type: String,
		required: true
	},
	localValue: {
		type: Number,
		required: true
	}
})
const emit = defineEmits(['update:value'])
const internalValue = ref(props.localValue)

const updateInternalValue = () => {
	emit('update:value', Number(internalValue.value))
}
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
			@input="updateInternalValue"
		/>
	</div>
</template>
