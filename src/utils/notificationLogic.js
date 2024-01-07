const TITLE = 'Pomodoro'
const TEXT = 'Time to {mode}'

export const showNotification = (mode, title = TITLE) => {
	if ((!'Notification') in window) {
		return
	}

	if (Notification.permission === 'granted') {
		createNotification(mode, title)
		return
	}

	if (Notification.permission !== 'denied') {
		Notification.requestPermission()
		if (Notification.permission === 'granted') {
			createNotification(mode, title)
			return
		}
	}
}

const createNotification = (mode, title) => {
	const notificationText = TEXT.replace('{mode}', mode)

	return new Notification(title, {
		body: notificationText
	})
}
