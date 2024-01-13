<script setup>
import { ref } from 'vue'
import ModalSettings from '@components/PanelSettings.vue'
import ModalHistory from '@components/PanelHistory.vue'
import PanelButtons from '@components/panelButtons.vue'

const emits = defineEmits(['resetTimer'])

const isModalHistoryOpen = ref(false)
const isModalSettingsOpen = ref(false)
const close = () => {
	isModalHistoryOpen.value = false
	isModalSettingsOpen.value = false
}
</script>
<template>
	<div
		class="absolute -translate-x-[425px] h-full transition-all duration-700 ease-in-out flex max-md:hidden"
		:class="{ 'translate-x-0': isModalSettingsOpen || isModalHistoryOpen }"
	>
		<div class="w-[425px] bg-white/30">
			<ModalSettings
				v-if="isModalSettingsOpen"
				@update:worktime="emits('resetTimer')"
				@update:shortbreaktime="emits('resetTimer')"
				@update:longbreaktime="emits('resetTimer')"
			></ModalSettings>
			<ModalHistory v-if="isModalHistoryOpen"></ModalHistory>
		</div>

		<PanelButtons
			:is-modal-settings-open="isModalSettingsOpen"
			:is-modal-history-open="isModalHistoryOpen"
			@update:is-modal-settings-open="isModalSettingsOpen = $event"
			@update:is-modal-history-open="isModalHistoryOpen = $event"
		/>
	</div>

	<div class="max-md:flex hidden">
		<div class="absolute w-full z-20 bg-slate-300 dark:bg-black">
			<ModalSettings
				v-if="isModalSettingsOpen"
				@update:worktime="emits('resetTimer')"
				@update:shortbreaktime="emits('resetTimer')"
				@update:longbreaktime="emits('resetTimer')"
			></ModalSettings>
			<ModalHistory v-if="isModalHistoryOpen"></ModalHistory>
		</div>
		<button
			v-if="isModalHistoryOpen || isModalSettingsOpen"
			class="absolute w-8 h-8 top-2 right-2 z-20"
			@click="close"
		>
			<div class="flex flex-col items-center">
				<div class="bg-black h-5 w-[2px] rounded-full -mb-2 rotate-45"></div>
				<div class="bg-black h-5 w-[2px] rounded-full -mt-3 -rotate-45"></div>
			</div>
		</button>
		<PanelButtons
			:is-modal-settings-open="isModalSettingsOpen"
			:is-modal-history-open="isModalHistoryOpen"
			@update:is-modal-settings-open="isModalSettingsOpen = $event"
			@update:is-modal-history-open="isModalHistoryOpen = $event"
		/>
	</div>
</template>
