<script setup>
import { ref, watch } from 'vue'
import { useSettingsStore } from '@store/storeSettings'
import PanelSettingsForm from './PanelSettingsForm.vue'
import PanelSettingsSwitch from './PanelSettingsSwitch.vue'
import PanelSettingsSwitchTheme from './PanelSettingsSwitchTheme.vue'
import { switchDarkTheme } from '@composable/switchDarkTheme'
import { titleNot, titleTheme } from '@constants'

const emit = defineEmits([
	'update:worktime',
	'update:shortbreaktime',
	'update:longbreaktime'
])

const { colorTheme } = switchDarkTheme()

const settingsStore = useSettingsStore()

const localWorkTime = ref(settingsStore.settings.times.work)
const localShortBreakTime = ref(settingsStore.settings.times.shortBreak)
const localLongBreakTime = ref(settingsStore.settings.times.longBreak)
const notificationStatus = ref(settingsStore.settings.notificationsEnabled)

watch(notificationStatus, newValue => {
	settingsStore.setNotificationSetting(newValue)
})

function handleFormClick(values) {
	settingsStore.updateWorkTime(values.work)
	settingsStore.updateShortBreakTime(values.shortBreak)
	settingsStore.updateLongBreakTime(values.longBreak)

	emit('update:worktime', values.work)
	emit('update:shortbreaktime', values.shortBreak)
	emit('update:longbreaktime', values.longBreak)
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

		<PanelSettingsSwitchTheme
			v-model="colorTheme"
			:title="titleTheme"
		/>

		<PanelSettingsSwitch
			v-model="notificationStatus"
			:title="titleNot"
		/>
	</div>
</template>
