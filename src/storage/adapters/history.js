import storage from '../index'

const STORAGE_HISTORY_KEY = 'history'

function setHistoryInStorage(value) {
	storage.setItem(STORAGE_HISTORY_KEY, JSON.stringify(value))
}

function getHistoryInStorage() {
	return storage.getItem(STORAGE_HISTORY_KEY)
}

export default {
	setHistoryInStorage,
	getHistoryInStorage
}
