<script setup>
import { watchEffect, onMounted, ref, computed } from 'vue'
import { useTimer } from 'vue-timer-hook'
import TimerTime from '@components/TimerTime.vue'
import PanelLeft from '@components/PanelLeft.vue'
import ControlsButton from './components/ControlsButton.vue'
import { useSettingsStore } from '@store/storeSettings'
import { useHistoryStore } from '@store/storeHistory'
import { showNotification } from '@utils'
import { MILLISECONDS_IN_MINUTE } from '@constants'
import { modeNames } from '@config'

const settingsStore = useSettingsStore()
const historyStore = useHistoryStore()

const checkTimer = ref('Start')
const skipPartTimer = ref(1)
const mode = computed(() => {
	return settingsStore.settings.selectedMode
})

const workTimeMode = computed(() => {
	return settingsStore.settings.times.work * MILLISECONDS_IN_MINUTE
})

const shortBreakTimeMode = computed(() => {
	return settingsStore.settings.times.shortBreak * MILLISECONDS_IN_MINUTE
})

const longBreakTimeMode = computed(() => {
	return settingsStore.settings.times.longBreak * MILLISECONDS_IN_MINUTE
})

const timer = useTimer(
	Date.now() + settingsStore.settings.times[mode.value],
	false
)
restartTimer()

function restartTimer() {
	if (mode.value === 'work') {
		timer.restart(Date.now() + workTimeMode.value, false)
	}

	if (mode.value === 'shortBreak') {
		timer.restart(Date.now() + shortBreakTimeMode.value, false)
	}

	if (mode.value === 'longBreak') {
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

function cycleSkipTimerPart() {
	if (skipPartTimer.value >= 4) {
		restartTimer()
		skipPartTimer.value = 1
		return
	}

	skipPartTimer.value += 1
	restartTimer()
}

onMounted(() => {
	watchEffect(async () => {
		// 00:30, a: xx:xx
		// TODO: Try refactor

		if (timer.isExpired.value) {
			if (mode.value !== 'work') {
				if (mode.value === 'shortBreak') {
					historyStore.addHistory(
						shortBreakTimeMode.value,
						'Short Break',
						skipPartTimer.value
					)

					skipPartTimer.value += 1
				} else {
					historyStore.addHistory(
						longBreakTimeMode.value,
						'Long Break',
						skipPartTimer.value
					)

					skipPartTimer.value = 1
				}

				settingsStore.setSelectedMode('work')

				if (settingsStore.settings.notificationsEnabled) {
					showNotification(modeNames[mode.value])
				}
				restartTimer()
				return
			}

			historyStore.addHistory(workTimeMode.value, 'Work', skipPartTimer.value)

			if (skipPartTimer.value >= 4) {
				settingsStore.setSelectedMode('longBreak')
			} else {
				settingsStore.setSelectedMode('shortBreak')
			}
			if (settingsStore.settings.notificationsEnabled) {
				showNotification(modeNames[mode.value])
			}
			restartTimer()
		}
	})
})
</script>

<template>
	<main class="min-h-screen w-full h-full backdrop-blur-3xl">
		<div
			class="absolute w-full h-full flex flex-col justify-center items-center"
		>
			<h1 class="flex text-6xl items-center justify-center max-sm:text-4xl">
				{{ modeNames[mode] }}
			</h1>
			<div
				class="flex flex-col justify-center items-center mt-40 w-[450px] font-semibold"
			>
				<TimerTime
					:minutes="timer.minutes.value"
					:seconds="timer.seconds.value"
				/>

				<h2 class="mt-4 text-2xl">
					{{ skipPartTimer }} / {{ settingsStore.settings.partTimer }}
				</h2>

				<ControlsButton
					:status-timer="checkTimer"
					@reset-timer="restartTimer"
					@skip-timer="cycleSkipTimerPart"
					@switch-timer="switchingTimer"
				/>
			</div>
		</div>

		<PanelLeft @reset-timer="restartTimer" />
	</main>
</template>
