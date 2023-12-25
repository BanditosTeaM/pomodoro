export const showNotification = timerTitle => {
	if ('Notification' in window) {
		if (Notification.permission === 'granted') {
			createNotification(timerTitle)
		} else if (Notification.permission !== 'denied') {
			Notification.requestPermission().then(permission => {
				if (permission === 'granted') {
					createNotification(timerTitle)
				}
			})
		}
	}
}
const createNotification = timerTitle => {
	return new Notification('Pomodoro', {
		body: `Time to ${timerTitle}`
	})
}
