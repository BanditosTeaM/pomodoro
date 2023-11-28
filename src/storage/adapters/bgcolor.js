import storage from '../index'

const STORAGE_BGCOLOR_KEY = 'infoBGColor'

function setBGColorInStorage(value) {
	storage.setItem(STORAGE_BGCOLOR_KEY, JSON.stringify(value))
}

function getBGColorInStorage() {
	return storage.getItem(STORAGE_BGCOLOR_KEY)
}

export default {
	setBGColorInStorage,
	getBGColorInStorage
}
