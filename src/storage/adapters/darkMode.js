import storage from '../index'

const STORAGE_DARKMODE_KEY = 'dark-mode'

function setDarkModeInStorage(value) {
	storage.setItem(STORAGE_DARKMODE_KEY, JSON.stringify(value))
}

function getDarkModeInStorage() {
	return storage.getItem(STORAGE_DARKMODE_KEY)
}

export default {
	setDarkModeInStorage,
	getDarkModeInStorage
}
