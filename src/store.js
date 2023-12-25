import { defineStore } from 'pinia'
import storageNotification from './storage/adapters/notification'
import storageHistory from './storage/adapters/history'

export const useDataStore = defineStore('data', {
	state: () => ({
		titleTimerData: [
			{ work: 'Work' },
			{ shortBreak: 'Short Break' },
			{ longBreak: 'Long Break' }
		],
		settings: {
			times: {
				work: 2,
				shortBreak: 3,
				longBreak: 4
			},

			selectedMode: 'work',
			notificationsEnabled: false
		},
		history: []
	}),

	getters: {
		timerTitle: state => {
			return state.titleTimerData.find(
				item => item[state.settings.selectedMode]
			)[state.settings.selectedMode]
		}
	},

	actions: {
		initializeNotificationsState() {
			const jsonNotification = JSON.parse(
				storageNotification.getNotificationInStorage()
			)
			if (!jsonNotification) return

			this.settings.notificationsEnabled = jsonNotification
		},

		initializeHistoryState() {
			const jsonHistory = JSON.parse(storageHistory.getHistoryInStorage())
			if (!jsonHistory) return

			this.history = jsonHistory
		},

		setSelectedMode(newMode) {
			this.settings.selectedMode = newMode
		},

		updateWorkTime(newWorkTime) {
			this.settings.times.work = newWorkTime
		},

		updateShortBreakTime(newShortBreakTime) {
			this.settings.times.shortBreak = newShortBreakTime
		},
		updateLongBreakTime(newLongBreakTime) {
			this.settings.times.longBreak = newLongBreakTime
		},

		setNotificationSetting(value) {
			this.settings.notificationsEnabled = value
			storageNotification.setNotificationInStorage(
				this.settings.notificationsEnabled
			)
		},

		addHistory(count, mode, partTimer) {
			this.history.push({
				id: String(Math.floor(new Date().getTime() / 1000)),
				count: count,
				mode: mode,
				partTimer: partTimer
			})

			storageHistory.setHistoryInStorage(this.history)
		},

		deleteHistory(id) {
			this.history = this.history.filter(item => item.id !== id)
			storageHistory.setHistoryInStorage(this.history)
		}
	}
})
