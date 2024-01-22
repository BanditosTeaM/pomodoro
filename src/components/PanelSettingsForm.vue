<script setup>
import { defineModel, computed, ref } from 'vue'
import TimeInput from './TimeInput.vue'
import { ERROR_MESSAGE } from '@/constants'

const emit = defineEmits(['click'])
const data = [
	{ key: 'work', title: 'Work time:' },
	{ key: 'shortBreak', title: 'Break time:' },
	{ key: 'longBreak', title: 'Long break time:' }
]

const errors = {
	work: ref(''),
	shortBreak: ref(''),
	longBreak: ref('')
}

const localWorkTime = defineModel('localWorkTime', { type: Number })
const localShortBreakTime = defineModel('localShortBreakTime', { type: Number })
const localLongBreakTime = defineModel('localLongBreakTime', { type: Number })

const modelValues = {
	work: localWorkTime.value,
	shortBreak: localShortBreakTime.value,
	longBreak: localLongBreakTime.value
}

const isFormValid = computed(() => {
	return (
		Number(modelValues.work) &&
		modelValues.work > 0 &&
		Number(modelValues.shortBreak) &&
		modelValues.shortBreak > 0 &&
		Number(modelValues.longBreak) &&
		modelValues.longBreak > 0
	)
})

const handleSubmit = () => {
	if (isFormValid.value) {
		emit('click', modelValues)
	} else {
		if (!Number(modelValues.work) || modelValues.work <= 0) {
			errors.work.value = ERROR_MESSAGE
		}
		if (!Number(modelValues.shortBreak) || modelValues.shortBreak <= 0) {
			errors.shortBreak.value = ERROR_MESSAGE
		}
		if (!Number(modelValues.longBreak) || modelValues.longBreak <= 0) {
			errors.longBreak.value = ERROR_MESSAGE
		}
	}
}
</script>

<template>
	<form
		class="block mb-2"
		@submit.prevent="handleSubmit"
	>
		<div
			v-for="item in data"
			:key="item.key"
			class="mb-4 flex flex-col"
		>
			<TimeInput
				v-model="modelValues[item.key]"
				:title="item.title"
			/>
			<span
				v-if="errors[item.key].value"
				class="block text-white text-xs"
			>
				{{ errors[item.key].value }}
			</span>
		</div>

		<hr class="min-w-full h-px border-black mb-2 mt-2 dark:border-white" />

		<div class="flex justify-center">
			<button
				class="h-10 w-52 border rounded-2xl border-black dark:border-white"
				type="submit"
			>
				Set Time
			</button>
		</div>
	</form>
</template>
