import { defineStore } from 'pinia'
import storageBGColor from './storage/adapters/bgcolor'

export const useDataStore = defineStore('data', {
	state: () => ({
		settings: {
			times: {
				// in minutes
				work: 2000,
				shortBreak: 3000,
				longBreak: 4000
			},

			selectedMode: 'work',
			selectedBGColor: 'bg-gray-500'
		}
	}),
	actions: {
		initializeBGColor() {
			const jsonBGColor = JSON.parse(storageBGColor.getBGColorInStorage())
			if (!jsonBGColor) return

			this.settings.selectedBGColor = jsonBGColor
		},
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
		},
		updateBGColor(newBGColor) {
			this.settings.selectedBGColor = newBGColor
			storageBGColor.setBGColorInStorage(this.settings.selectedBGColor)
		}
	}
})
