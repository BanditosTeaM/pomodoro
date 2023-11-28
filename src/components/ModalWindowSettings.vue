<script setup>
import { ref, defineEmits, onMounted, computed, watch } from 'vue'
import { useDataStore } from '../store'
import colors from '../api/colors'

const emit = defineEmits([
	'update:worktime',
	'update:shortbreaktime',
	'update:longbreaktime',
	'update:bgcolor'
])

const dataStore = useDataStore()
const localWorkTime = ref(dataStore.settings.times.work)
const localShortBreakTime = ref(dataStore.settings.times.shortBreak)
const localLongBreakTime = ref(dataStore.settings.times.longBreak)
const localBGColor = ref(dataStore.settings.selectedBGColor)

const defaultColor = ref('bg-white')

onMounted(() => {
	watch(() => {
		if (localWorkTime.value === '') {
			localWorkTime.value = 0
		}
	})
	if (localBGColor.value !== undefined) {
		defaultColor.value = localBGColor.value
	}
})

function setColor(value) {
	emit('update:bgcolor', value)
}

const inputWidth = computed(() => {
	const stringValue = String(localWorkTime.value).length
	const minWidth = 20
	return `${minWidth + stringValue * 8}px`
})

function handleSubmit() {
	dataStore.updateWorkTime(localWorkTime.value)
	emit('update:worktime', localWorkTime.value)

	dataStore.updateShortBreakTime(localShortBreakTime.value)
	emit('update:shortbreaktime', localShortBreakTime.value)

	dataStore.updateLongBreakTime(localLongBreakTime.value)
	emit('update:longbreaktime', localLongBreakTime.value)
}
</script>

<template>
	<div class="block bg-slate-300 min-h-screen w-[425px] pl-5 pr-5">
		<h1 class="pb-2 pt-2 font-bold text-xl text-center">Settings</h1>
		<hr
			class="min-w-full h-[2px] mb-2 mt-2"
			:class="`${defaultColor}`"
		/>
		<h2>Set Time</h2>
		<p class="block text-gray-400 text-sm pt-1 pb-2">
			This will reset the clock if you have a timer in progress.
		</p>
		<form
			class="block mb-2"
			@submit.prevent="handleSubmit"
		>
			<div class="mb-4 flex items-center">
				<label class="block w-1/2">Work time (in min):</label>
				<input
					v-model="localWorkTime"
					class="border-b border-solid border-black outline-none opacity-none w-12 bg-transparent text-center"
					:style="{ width: inputWidth }"
					type="number"
					min="0"
				/>
			</div>

			<div class="mb-4 flex items-center">
				<label class="block w-1/2">Break time (in min):</label>
				<input
					v-model="localShortBreakTime"
					class="border-b border-solid border-black outline-none opacity-none bg-transparent w-12 text-center"
					type="number"
					min="0"
				/>
			</div>

			<div class="mb-4 flex items-center">
				<label class="block w-1/2">Long break time (in min):</label>
				<input
					v-model="localLongBreakTime"
					class="border-b border-solid border-black outline-none opacity-none bg-transparent w-12 text-center"
					type="number"
					min="0"
				/>
			</div>
		</form>
		<hr
			class="min-w-full bg-black h-[2px] mb-2 mt-2"
			:class="`${defaultColor}`"
		/>
		<div class="flex justify-center">
			<button
				class="h-10 w-52 pl-2 pr-2 rounded-2xl"
				:class="`${defaultColor} hover:border-2 border-solid border-white`"
				type="submit"
				@click="handleSubmit"
			>
				Set Time
			</button>
		</div>

		<hr
			class="min-w-full bg-black h-[2px] mb-2 mt-2"
			:class="`${defaultColor}`"
		/>
		<h2>Set background color</h2>

		<label
			v-for="color in colors"
			:key="color"
			class="circle-label inline-block"
		>
			<input
				v-model="defaultColor"
				class="circle-input absolute appearance-none"
				type="radio"
				name="circle-radio"
				:value="color"
			/>
			<span
				class="circle-span inline-block h-7 w-7 ml-1 cursor-pointer rounded-full"
				:class="`${color}`"
				@click="setColor(color)"
			></span>
		</label>
	</div>
</template>

<style scoped>
.circle-label:first-child .circle-input:checked + .circle-span {
	box-shadow: 0 0 0 2px white;
}
.circle-input:checked + .circle-span {
	box-shadow: 0 0 0 2px white;
}
</style>
