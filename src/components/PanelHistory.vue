<script setup>
import { computed } from 'vue'
import closeIcon from '../assets/close.svg'
import { reverseSortById } from '@helpers/reverseSortById'
import { useHistoryStore } from '@store/storeHistory'
import { useSettingsStore } from '@store/storeSettings'

const historyStore = useHistoryStore()
const settingsStore = useSettingsStore()

const part = computed(() => {
	return settingsStore.settings.partTimer
})

const sortedHistoryList = computed(() => {
	return historyStore.history.toSorted(reverseSortById)
})
</script>

<template>
	<div
		class="flex flex-col w-[425px] min-h-screen pl-5 pr-5 border-r border-black text-lg font-medium dark:border-white max-md:w-full"
	>
		<div class="h-full overflow-y-auto">
			<h1 class="pb-2 pt-2 font-bold text-xl text-center">History</h1>
			<hr class="min-w-full h-px border-black mb-2 mt-2 dark:border-white" />
			<div
				v-for="item in sortedHistoryList"
				:key="item.id"
			>
				<div class="flex justify-between items-center">
					<span>Time: {{ item.count }}(min)</span>
					<button @click="historyStore.deleteHistory(item.id)">
						<closeIcon />
					</button>
				</div>
				<div class="flex justify-between items-center">
					<span>{{ item.mode }}</span>
					<span>({{ item.partTimer }} / {{ part }})</span>
				</div>
				<hr class="min-w-full h-px border-black mb-2 mt-2 dark:border-white" />
			</div>
		</div>
	</div>
</template>
