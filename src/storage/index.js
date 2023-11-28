// global localStorage

function setItem(name, value) {
	localStorage.setItem(name, value)
}

function getItem(name) {
	return localStorage.getItem(name)
}

export default {
	setItem,
	getItem
}
