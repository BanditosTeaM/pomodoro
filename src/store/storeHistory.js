import { defineStore } from 'pinia'

export const useHistoryStore = defineStore('history', {
	state: () => ({
		history: []
	}),

	actions: {
		addHistory(count, mode, partTimer) {
			this.history.push({
				id: String(Math.floor(new Date().getTime() / 1000)),
				count: count / 1000 / 60,
				mode: mode,
				partTimer: partTimer
			})
		},

		deleteHistory(id) {
			this.history = this.history.filter(item => item.id !== id)
		}
	},
	persist: true
})
