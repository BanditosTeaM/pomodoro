import { ref } from 'vue'

export const switchDarkTheme = () => {
	const darkMode = ref(false)

	const toggleDarkMode = () => {
		darkMode.value = !darkMode.value
		document.body.classList.toggle('dark', darkMode.value)
	}

	return { toggleDarkMode, darkMode }
}
