<script setup>
import { watchEffect, onMounted, ref, computed } from 'vue'
import { useTimer } from 'vue-timer-hook'
import ModalSettings from './components/PanelSettings.vue'
import ModalHistory from './components/PanelHistory.vue'
import TimerDigit from './components/TimerDigit.vue'
import { useDataStore } from '../src/store'
import { useDark } from '@vueuse/core'

const isDark = useDark()
const dataStore = useDataStore()

const isModalHistoryOpen = ref(false)
const isModalSettingsOpen = ref(false)
const checkTimer = ref('Start')
const skipPartTimer = ref(1)

const titleTimerData = [
	{
		work: 'Work'
	},
	{
		shortBreak: 'Short Break'
	},
	{
		longBreak: 'Long Break'
	}
]
const setTitleTimer = computed(() => {
	const title = titleTimerData.find(
		item => Object.keys(item)[0] === dataStore.settings.selectedMode
	)[dataStore.settings.selectedMode]
	return title
})
// from minutes to milliseconds
const workTimeMode = computed(() => {
	return dataStore.settings.times.work * 1000
})

const shortBreakTimeMode = computed(() => {
	return dataStore.settings.times.shortBreak * 1000
})

const longBreakTimeMode = computed(() => {
	return dataStore.settings.times.longBreak * 60 * 1000
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
	isModalHistoryOpen.value = false
}

function toggleModalHistory() {
	isModalHistoryOpen.value = !isModalHistoryOpen.value
	isModalSettingsOpen.value = false
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
		restartTimer()
		skipPartTimer.value = 1
		return
	}

	skipPartTimer.value += 1
	restartTimer()
}

const showNotification = () => {
	if (dataStore.settings.notificationsEnabled && 'Notification' in window) {
		if (Notification.permission === 'granted') {
			createNotification()
		} else if (Notification.permission !== 'denied') {
			Notification.requestPermission().then(permission => {
				if (permission === 'granted') {
					createNotification()
				}
			})
		}
	}
}

const createNotification = () => {
	const notification = new Notification('Pomodoro', {
		body: `Time to ${setTitleTimer.value}`,
		icon: 'путь/к/изображению.png'
	})

	notification.onclick = () => {
		console.log('Уведомление было кликнуто.')
	}
}

onMounted(() => {
	dataStore.initializeNotificationsState(), dataStore.initializeHistoryState()

	watchEffect(async () => {
		if (timer.isExpired.value) {
			if (dataStore.settings.selectedMode !== 'work') {
				if (dataStore.settings.selectedMode === 'shortBreak') {
					dataStore.addHistory(
						shortBreakTimeMode.value,
						'Short Break',
						skipPartTimer.value
					)

					skipPartTimer.value += 1
				} else {
					dataStore.addHistory(
						longBreakTimeMode.value,
						'Long Break',
						skipPartTimer.value
					)

					skipPartTimer.value = 1
				}

				dataStore.setSelectedMode('work')

				showNotification()
				restartTimer()
				return
			}

			dataStore.addHistory(workTimeMode.value, 'Work', skipPartTimer.value)

			if (skipPartTimer.value >= 4) {
				dataStore.setSelectedMode('longBreak')
			} else {
				dataStore.setSelectedMode('shortBreak')
			}
			showNotification()
			restartTimer()
		}
	})
})
</script>

<template>
	<main
		class="w-full h-full min-h-screen"
		:class="{
			dark: isDark,
			'bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500': !isDark
		}"
	>
		<div
			class="absolute w-full h-full flex flex-col justify-center items-center"
		>
			<h1 class="block -mt-60 text-6xl">{{ setTitleTimer }}</h1>

			<div
				class="flex flex-col justify-center items-center mt-40 w-[450px] font-semibold"
			>
				<div>
					<div class="-mt-10 mb-10 text-6xl">
						<TimerDigit :digit="timer.minutes" />

						<TimerDigit
							class="-mt-5"
							:digit="timer.seconds"
						/>
					</div>
				</div>
				<h2 class="mt-4 text-2xl">{{ skipPartTimer }} / 4</h2>
				<div class="flex mt-10 space-x-24 text-2xl">
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
		</div>
		<div class="absolute flex flex-col pt-2">
			<div
				class="flex justify-center mt-3 px-1 py-1 border border-black border-solid rounded-r-lg translate-x-0 transition-all duration-500 dark:border-white"
				:class="{
					'!translate-x-[424px]': isModalSettingsOpen || isModalHistoryOpen
				}"
			>
				<button
					class="h-7"
					@click="toggleModalSetings"
				>
					Settings
				</button>
			</div>
			<div
				class="flex justify-center mt-3 px-1 py-1 border border-black border-solid rounded-r-lg translate-x-0 transition-all duration-500 dark:border-white"
				:class="{
					'!translate-x-[424px]': isModalSettingsOpen || isModalHistoryOpen
				}"
			>
				<button
					class="h-7"
					@click="toggleModalHistory"
				>
					History
				</button>
			</div>
		</div>

		<ModalSettings
			v-if="isModalSettingsOpen"
			@update:worktime="updatedWorkTime"
			@update:shortbreaktime="updatedShortBreakTime"
			@update:longbreaktime="updatedLongBreakTime"
			@update:bgcolor="value => dataStore.updateBGColor(value)"
		></ModalSettings>
		<ModalHistory v-if="isModalHistoryOpen"></ModalHistory>
	</main>
</template>
