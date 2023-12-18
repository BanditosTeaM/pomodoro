import { defineStore } from 'pinia'
import storageNotification from './storage/adapters/notification'
import storageHistory from './storage/adapters/history'

export const useDataStore = defineStore('data', {
	state: () => ({
		settings: {
			times: {
				// in minutes
				work: 2,
				shortBreak: 3,
				longBreak: 4
			},

			selectedMode: 'work',
			notificationsEnabled: false
		},
		history: []
	}),
	// XXX: ADD ENTER!!!!!!
	actions: {
		initializeNotificationsState() {
			const jsonNotification = JSON.parse(
				storageNotification.getNotificationInStorage()
			)
			if (!jsonNotification) return

			this.settings.notificationsEnabled = jsonNotification
		},
		// XXX: ADD ENTER!!!!!!
		initializeHistoryState() {
			const jsonHistory = JSON.parse(storageHistory.getHistoryInStorage())
			if (!jsonHistory) return

			this.history = jsonHistory
		},
		// XXX: ADD ENTER!!!!!!
		setSelectedMode(newMode) {
			this.settings.selectedMode = newMode
		},
		// XXX: ADD ENTER!!!!!!
		updateWorkTime(newWorkTime) {
			this.settings.times.work = newWorkTime
		},
		// XXX: ADD ENTER!!!!!!
		updateShortBreakTime(newShortBreakTime) {
			this.settings.times.shortBreak = newShortBreakTime
		},
		updateLongBreakTime(newLongBreakTime) {
			this.settings.times.longBreak = newLongBreakTime
		},
		// XXX: ADD ENTER!!!!!!
		updateBGColor(newBGColor) {
			this.settings.selectedBGColor = newBGColor
		},
		// XXX: ADD ENTER!!!!!!
		setNotificationSetting(value) {
			this.settings.notificationsEnabled = value
			storageNotification.setNotificationInStorage(
				this.settings.notificationsEnabled
			)
		},
		// XXX: ADD ENTER!!!!!!
		addHistory(count, mode, partTimer) {
			this.history.push({
				id: String(Math.floor(new Date().getTime() / 1000)),
				count: count,
				mode: mode,
				partTimer: partTimer
			})
			// XXX: ADD ENTER!!!!!!
			storageHistory.setHistoryInStorage(this.history)
		},
		// XXX: ADD ENTER!!!!!!
		deleteHistory(id) {
			this.history = this.history.filter(item => item.id !== id)
			storageHistory.setHistoryInStorage(this.history)
		}
	}
})
