<script setup>
import { ref, watch } from 'vue'
import { useSettingsStore } from '@store/storeSettings'
import { switchDarkTheme } from '../composable/switchDarkTheme'
import PanelSettingsForm from './PanelSettingsForm.vue'

const { darkMode, toggleDarkMode } = switchDarkTheme()

const emit = defineEmits([
	'update:worktime',
	'update:shortbreaktime',
	'update:longbreaktime'
])

const settingsStore = useSettingsStore()

const localWorkTime = ref(settingsStore.settings.times.work)
const localShortBreakTime = ref(settingsStore.settings.times.shortBreak)
const localLongBreakTime = ref(settingsStore.settings.times.longBreak)
const notificationCheck = ref(settingsStore.settings.notificationsEnabled)

watch(notificationCheck, newValue => {
	settingsStore.setNotificationSetting(newValue)
})

function handleFormClick(values) {
	settingsStore.updateWorkTime(values.workTime)
	settingsStore.updateShortBreakTime(values.shortBreakTime)
	settingsStore.updateLongBreakTime(values.longBreakTime)

	emit('update:worktime', values.workTime)
	emit('update:shortbreaktime', values.shortBreakTime)
	emit('update:longbreaktime', values.longBreakTime)
}
</script>

<template>
	<div
		class="flex flex-col min-h-screen w-[425px] shadow-left pl-5 pr-5 border-r border-black text-lg font-medium dark:border-white max-md:w-full"
	>
		<!-- тута должен быть backdrop-blur-md bg-white/30  -->

		<h1 class="pb-2 pt-2 font-bold text-xl text-center">Settings</h1>
		<hr class="min-w-full h-px border-black mb-2 mt-2 dark:border-white" />
		<h2 class="">Set Time (in min)</h2>
		<p class="block text-white text-sm pt-1 pb-2">
			This will reset the clock if you have a timer in progress.
		</p>

		<PanelSettingsForm
			v-model:localWorkTime="localWorkTime"
			v-model:localShortBreakTime="localShortBreakTime"
			v-model:localLongBreakTime="localLongBreakTime"
			@click="handleFormClick"
		/>

		<hr class="min-w-full h-px border-black mb-2 mt-2 dark:border-white" />
		<h2>Other Settings</h2>

		<!-- 01:30, a: xx:xx -->
		<div class="mb-4 flex items-center">
			<h3 class="block w-1/2">Dark mode</h3>
			<!--  TODO: Create another component Switch for it  -->
			<label class="switch">
				<input
					v-model="darkMode"
					type="checkbox"
					@click="toggleDarkMode"
				/>
				<span
					class="slider round border rounded-2xl border-black dark:border-wheat"
				></span>
			</label>
		</div>
		<div class="mb-4 flex items-center">
			<h3 class="block w-1/2">Notification</h3>
			<!-- TODO: Create another component Switch for it -->
			<label class="switch">
				<input
					v-model="notificationCheck"
					type="checkbox"
				/>
				<span
					class="slider round border rounded-2xl border-black dark:border-wheat"
				></span>
			</label>
		</div>
	</div>
</template>

<style scoped>
.circle-label:first-child .circle-input:checked + .circle-span {
	box-shadow: 0 0 0 2px white;
}
.circle-input:checked + .circle-span {
	box-shadow: 0 0 0 2px white;
}
.switch {
	position: relative;
	display: inline-block;
	width: 44px;
	height: 24px;
}

.switch input {
	display: none;
}

/* The slider */
.slider {
	position: absolute;
	cursor: pointer;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	background-color: transparent;
	-webkit-transition: 0.4s;
	transition: 0.4s;
}

.slider:before {
	position: absolute;
	content: '';
	height: 20px;
	width: 20px;
	left: 4px;
	bottom: 1px;
	background-color: white;
	-webkit-transition: 0.4s;
	transition: 0.4s;
	transform: translateX(0px);
}

input:checked + .slider {
	background-color: black;
}

input:focus + .slider {
	box-shadow: 0 0 1px #2196f3;
}

input:checked + .slider:before {
	-webkit-transform: translateX(px);
	-ms-transform: translateX(20px);
	transform: translateX(12px);
}

/* Rounded sliders */
.slider.round {
	border-radius: 34px;
}

.slider.round:before {
	border-radius: 50%;
}
</style>
