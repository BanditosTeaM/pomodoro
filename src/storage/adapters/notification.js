import storage from '../index'

const STORAGE_NOTIFICATION_KEY = 'notification'

function setNotificationInStorage(value) {
	storage.setItem(STORAGE_NOTIFICATION_KEY, JSON.stringify(value))
}

function getNotificationInStorage() {
	return storage.getItem(STORAGE_NOTIFICATION_KEY)
}

export default {
	setNotificationInStorage,
	getNotificationInStorage
}
