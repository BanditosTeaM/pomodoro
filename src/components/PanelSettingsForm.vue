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

const localWorkTime = defineModel('localWorkTime')
const localShortBreakTime = defineModel('localShortBreakTime')
const localLongBreakTime = defineModel('localLongBreakTime')

const getLocalValue = key => {
	if (key === 'work') return localWorkTime.value
	if (key === 'shortBreak') return localShortBreakTime.value
	if (key === 'longBreak') return localLongBreakTime.value
}

const updateItemValue = (key, value) => {
	if (key === 'work') localWorkTime.value = Number(value)
	if (key === 'shortBreak') localShortBreakTime.value = Number(value)
	if (key === 'longBreak') localLongBreakTime.value = Number(value)
	errors[key].value = ''
}

const isFormValid = computed(() => {
	return (
		Number(localWorkTime.value) &&
		localWorkTime.value > 0 &&
		Number(localShortBreakTime.value) &&
		localShortBreakTime.value > 0 &&
		Number(localLongBreakTime.value) &&
		localLongBreakTime.value > 0
	)
})

const handleSubmit = () => {
	if (isFormValid.value) {
		emit('click', {
			workTime: localWorkTime.value,
			shortBreakTime: localShortBreakTime.value,
			longBreakTime: localLongBreakTime.value
		})
	} else {
		if (!Number(localWorkTime.value) || localWorkTime.value <= 0) {
			errors.work.value = ERROR_MESSAGE
		}
		if (!Number(localShortBreakTime.value) || localShortBreakTime.value <= 0) {
			errors.shortBreak.value = ERROR_MESSAGE
		}
		if (!Number(localLongBreakTime.value) || localLongBreakTime.value <= 0) {
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
				:title="item.title"
				:local-value="getLocalValue(item.key)"
				@update:value="updateItemValue(item.key, $event)"
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
