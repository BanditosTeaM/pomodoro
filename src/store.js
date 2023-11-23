import { defineStore } from 'pinia'

export const useDataStore = defineStore('data', {
	state: () => ({
		settings: {
			times: {
				// in minutes
				work: 2 / 60,
				shortBreak: 3 / 60,
				longBreak: 4 / 60
			},

			selectedMode: 'work'
		}
	}),
	actions: {
		setSelectedMode(newMode) {
			this.settings.selectedMode = newMode
		},
		updateWorkTime(newWorkTime) {
			this.settings.times.work = newWorkTime * 60
		},
		updateShortBreakTime(newShortBreakTime) {
			this.settings.times.shortBreak = newShortBreakTime * 60
		},
		updateLongBreakTime(newLongBreakTime) {
			this.settings.times.longBreak = newLongBreakTime * 60
		}
	}
})
