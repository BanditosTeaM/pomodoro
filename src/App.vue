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

const BGColorTimer = computed(() => {
	return dataStore.settings.selectedBGColor
})

// from minutes to milliseconds
const workTimeMode = computed(() => {
	return dataStore.settings.times.work
})

const shortBreakTimeMode = computed(() => {
	return dataStore.settings.times.shortBreak
})

const longBreakTimeMode = computed(() => {
	return dataStore.settings.times.longBreak
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
	timer.pause()
}

function toggleModalSetings() {
	isModalSettingsOpen.value = !isModalSettingsOpen.value
}

function updatedWorkTime() {
	timer.restart(Date.now() + workTimeMode.value, false)
	checkTimer.value = 'Start'
}

function updatedShortBreakTime() {
	timer.restart(Date.now() + workTimeMode.value, false)
	checkTimer.value = 'Start'
}

function updatedLongBreakTime() {
	timer.restart(Date.now() + workTimeMode.value, false)
	checkTimer.value = 'Start'
}

function cycleSkipTimerPart() {
	if (skipPartTimer.value >= 4) {
		return (skipPartTimer.value = 1)
	}

	skipPartTimer.value += 1
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
			} else {
				dataStore.setSelectedMode('shortBreak')
			}
			restartTimer()
		}
	})
	dataStore.initializeBGColor()
})
</script>

<template>
	<main :class="`${BGColorTimer} w-full h-full min-h-screen`">
		<div
			class="flex flex-col justify-between absolute top-2/4 left-2/4 -translate-x-1/2 -translate-y-1/2 text-center bg-white w-96 h-60 rounded-md"
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
			class="absolute pl-4"
			:class="{ 'translate-x-[425px]': isModalSettingsOpen === true }"
		>
			<button
				class="text-black pt-2"
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
			@update:bgcolor="value => dataStore.updateBGColor(value)"
		></ModalSettings>
	</main>
</template>
