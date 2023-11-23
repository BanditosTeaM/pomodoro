<script setup>
import { watchEffect, onMounted, ref, computed } from 'vue'
import { useTimer } from 'vue-timer-hook'
import ModalSettings from './components/ModalWindowSettings.vue'
import TimerDigit from './components/TimerDigit.vue'
import { useDataStore } from '../src/store'

const dataStore = useDataStore()

const isModalSettingsOpen = ref(false)
const checkTimer = ref('Start')
const skipPartTimer = ref(1)

const titleTimerData = [
	{
		id: 'work',
		title: 'Work Time'
	},
	{
		id: 'shortBreak',
		title: 'Short Break'
	},
	{
		id: 'longBreak',
		title: 'Long Break'
	}
]

const selectedTitle = computed(() => {
	const title = titleTimerData.find(
		item => item.id === dataStore.settings.selectedMode
	)
	return title.title
})

// from minutes to milliseconds
const workTimeMode = computed(() => {
	return dataStore.settings.times.work * 1000
})

const shortBreakTimeMode = computed(() => {
	return dataStore.settings.times.shortBreak * 1000
})

const longBreakTimeMode = computed(() => {
	return dataStore.settings.times.longBreak * 1000
})

const timer = useTimer(Date.now() + workTimeMode.value, false)

function restartTimer() {
	if (dataStore.settings.selectedMode === 'work') {
		timer.restart(Date.now() + workTimeMode.value, false)
	}
	if (dataStore.settings.selectedMode === 'shortBreak') {
		timer.restart(Date.now() + shortBreakTimeMode.value, false)
	}
	if (dataStore.settings.selectedMode === 'longBreak') {
		timer.restart(Date.now() + longBreakTimeMode.value, false)
	}
	checkTimer.value = 'Start'
}

function switchingTimer() {
	if (timer.isRunning.value === false) {
		checkTimer.value = 'Stop'
		return timer.resume()
	}

	checkTimer.value = 'Resume'
	return timer.pause()
}

function toggleModalSetings() {
	return (isModalSettingsOpen.value = !isModalSettingsOpen.value)
}

function updatedWorkTime(newWorkTime) {
	dataStore.updateWorkTime(newWorkTime)

	timer.restart(Date.now() + workTimeMode.value, false)
	checkTimer.value = 'Start'
}

function updatedShortBreakTime(newBreakTime) {
	dataStore.updateShortBreakTime(newBreakTime)
	timer.restart(Date.now() + workTimeMode.value, false)
	checkTimer.value = 'Start'
}

function updatedLongBreakTime(newLongTime) {
	dataStore.updateLongBreakTime(newLongTime)
	timer.restart(Date.now() + workTimeMode.value, false)
	checkTimer.value = 'Start'
}

function cycleSkipTimerPart() {
	if (skipPartTimer.value >= 4) {
		return (skipPartTimer.value = 1)
	}

	return (skipPartTimer.value += 1)
}

onMounted(() => {
	watchEffect(async () => {
		if (timer.isExpired.value) {
			if (dataStore.settings.selectedMode !== 'work') {
				skipPartTimer.value += 1

				if (dataStore.settings.selectedMode === 'longBreak') {
					skipPartTimer.value = 1
				}

				dataStore.setSelectedMode('work')
				restartTimer()
				return
			}

			if (skipPartTimer.value >= 4) {
				dataStore.setSelectedMode('longBreak')
				restartTimer()
				return
			} else {
				dataStore.setSelectedMode('shortBreak')
				restartTimer()
				return
			}
		}
	})
})
</script>

<template>
	<div
		class="flex flex-col justify-between fixed top-2/4 left-2/4 -translate-x-1/2 -translate-y-1/2 text-center bg-white w-96 h-60 rounded-md"
	>
		<div>
			<h1>{{ selectedTitle }}</h1>
			<h2>{{ skipPartTimer }} / 4</h2>

			<div class="text-lg">
				<TimerDigit :digit="timer.minutes" />
				:
				<TimerDigit :digit="timer.seconds" />
			</div>
		</div>
		<div class="flex h-10">
			<button
				class="w-full"
				@click="switchingTimer()"
			>
				{{ checkTimer }}
			</button>
			<button
				class="w-full"
				@click="restartTimer()"
			>
				Restart
			</button>
			<button
				class="w-full"
				@click="cycleSkipTimerPart()"
			>
				Next
			</button>
		</div>
	</div>
	<div
		class="absolute pl-3"
		:class="{ 'translate-x-[380px]': isModalSettingsOpen === true }"
	>
		<button
			class="text-black"
			@click="toggleModalSetings"
		>
			Settings
		</button>
	</div>
	<ModalSettings
		v-if="isModalSettingsOpen"
		@update:worktime="updatedWorkTime"
		@update:shortbreaktime="updatedShortBreakTime"
		@update:longbreaktime="updatedLongBreakTime"
	></ModalSettings>
</template>
