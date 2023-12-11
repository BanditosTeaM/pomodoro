<script setup>
import { computed, onMounted } from 'vue'
import { useDataStore } from '../store'
import closeIcon from '../assets/close.svg'

const dataStore = useDataStore()

const sortedHistoryList = computed(() => {
	return dataStore.history.toSorted((a, b) => {
		return Number(b.id) - Number(a.id)
	})
})
onMounted(() => {
	dataStore.initializeHistoryState()
})
</script>

<template>
	<div
		class="flex flex-col absolute w-[425px] min-h-screen pl-5 pr-5 border-r border-black text-lg font-medium dark:border-white"
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
					<button @click="dataStore.deleteHistory(item.id)">
						<closeIcon class="dark:fill-wheat" />
					</button>
				</div>
				<div class="flex justify-between items-center">
					<span>{{ item.mode }}</span>
					<span>({{ item.partTimer }} / 4)</span>
				</div>
				<hr class="min-w-full h-px border-black mb-2 mt-2 dark:border-white" />
			</div>
		</div>
	</div>
</template>
