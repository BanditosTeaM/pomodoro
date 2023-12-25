import { ref } from 'vue'
import storageDarkMode from '../storage/adapters/darkMode'

export const useDarkMode = () => {
	const darkMode = ref(true)

	const toggleDarkMode = () => {
		darkMode.value = !darkMode.value
		document.body.classList.toggle('dark', darkMode.value)
		storageDarkMode.setDarkModeInStorage(darkMode.value)
	}

	const initializeDarkModeState = () => {
		const savedDarkMode = storageDarkMode.getDarkModeInStorage()
		if (!savedDarkMode) return

		darkMode.value = JSON.parse(savedDarkMode)
		document.body.classList.toggle('dark', darkMode.value)
	}

	return { toggleDarkMode, darkMode, initializeDarkModeState }
}
