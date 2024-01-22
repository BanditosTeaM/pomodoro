import { ref, watch, onMounted } from 'vue'
import { useSettingsStore } from '@store/storeSettings'

export const switchDarkTheme = () => {
	const settingsStore = useSettingsStore()
	const darkSchemeMedia = matchMedia('(prefers-color-scheme: dark)')

	const colorTheme = ref(settingsStore.settings.colorTheme)

	function getSystemScheme() {
		const darkScheme = darkSchemeMedia.matches
		return darkScheme ? 'dark' : 'light'
	}

	const setupSwitcher = () => {
		const savedScheme = colorTheme.value
		const currentRadio = document.querySelector(
			`.switcher_radio[value=${savedScheme}]`
		)

		if (currentRadio !== null) {
			currentRadio.checked = true
		}
	}

	const setupScheme = () => {
		const systemScheme = getSystemScheme()
		const savedScheme = colorTheme.value

		if (savedScheme !== 'auto') {
			setScheme(savedScheme)
		} else {
			setScheme(systemScheme)
		}
	}

	const setScheme = scheme => {
		document.body.classList.toggle('dark', scheme === 'dark')
	}

	const saveScheme = scheme => {
		settingsStore.setColorTheme(scheme)
	}

	watch(colorTheme, newColorTheme => {
		if (newColorTheme !== 'auto') {
			setScheme(newColorTheme)
			saveScheme(newColorTheme)
		} else {
			saveScheme('auto')
			setScheme(getSystemScheme())
		}
	})

	onMounted(() => {
		setupScheme()
		setupSwitcher()
	})

	return { colorTheme, setupScheme, setupSwitcher }
}
