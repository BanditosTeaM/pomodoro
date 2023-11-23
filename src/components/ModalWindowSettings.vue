<script setup>
import { ref, defineEmits } from 'vue'
import { useDataStore } from '../store'

const emit = defineEmits([
	'update:worktime',
	'update:shortbreaktime',
	'update:longbreaktime'
])

const dataStore = useDataStore()

const localWorkTime = ref(dataStore.settings.times.work)
const localShortBreakTime = ref(dataStore.settings.times.shortBreak)
const localLongBreakTime = ref(dataStore.settings.times.longBreak)

function handleSubmit() {
	dataStore.updateWorkTime(localWorkTime.value)
	emit('update:worktime', localWorkTime.value)

	dataStore.updateShortBreakTime(localShortBreakTime.value)
	emit('update:shortbreaktime', localShortBreakTime.value)

	console.log('Long Break Time:', localLongBreakTime.value)
	dataStore.updateLongBreakTime(localLongBreakTime.value)
	emit('update:longbreaktime', localLongBreakTime.value)
}
</script>

<template>
	<div class="block bg-white min-h-screen w-96 pl-5">
		<h1 class="pb-2">Settings</h1>
		<hr class="w-52 bg-black h-[2px]" />
		<h2>Set Time</h2>
		<p class="block text-gray-400 text-sm pt-1 pb-2">
			This will reset the clock if you have a timer in progress.
		</p>
		<form
			class="grid grid-cols-2 mb-2"
			@submit.prevent="handleSubmit"
		>
			<label class="mb-4">Work time (in min):</label>
			<input
				v-model="localWorkTime"
				class="mb-4 border border-solid border-black"
				type="number"
				min="0"
			/>

			<label class="mb-4">Break time (in min):</label>
			<input
				v-model="localShortBreakTime"
				class="mb-4 border border-solid border-black"
				type="number"
				min="0"
			/>

			<label class="mb-4">Long break time (in min):</label>
			<input
				v-model="localLongBreakTime"
				class="mb-4 border border-solid border-black"
				type="number"
				min="0"
			/>
		</form>
		<hr class="w-52 bg-black h-[2px]" />

		<button
			type="submit"
			@click="handleSubmit"
		>
			Set Time
		</button>
	</div>
</template>
