import { defineStore } from 'pinia'

export const useSettingsStore = defineStore('settings', {
	state: () => ({
		settings: {
			times: {
				work: 2,
				shortBreak: 3,
				longBreak: 4
			},

			selectedMode: 'work',
			notificationsEnabled: false,
			colorTheme: 'dark',
			maxCounter: 4,
			defCounter: 1
		}
	}),

	actions: {
		setSelectedMode(newMode) {
			this.settings.selectedMode = newMode
		},

		updateWorkTime(newWorkTime) {
			this.settings.times.work = Number(newWorkTime)
		},

		updateShortBreakTime(newShortBreakTime) {
			this.settings.times.shortBreak = Number(newShortBreakTime)
		},
		updateLongBreakTime(newLongBreakTime) {
			this.settings.times.longBreak = Number(newLongBreakTime)
		},

		setNotificationSetting(value) {
			this.settings.notificationsEnabled = value
		}
	},
	persist: true
})
