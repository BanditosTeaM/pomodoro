<script setup>
import { ref, defineEmits, computed, onMounted } from 'vue'
import { useDataStore } from '../store'
import { useDark } from '@vueuse/core'

const isDark = useDark()

const emit = defineEmits([
	'update:worktime',
	'update:shortbreaktime',
	'update:longbreaktime'
])

const dataStore = useDataStore()
const localWorkTime = ref(dataStore.settings.times.work || 0)
const localShortBreakTime = ref(dataStore.settings.times.shortBreak)
const localLongBreakTime = ref(dataStore.settings.times.longBreak)
const notificationCheck = ref(dataStore.settings.notificationsEnabled)

const updateNotificationSetting = () => {
	dataStore.setNotificationSetting(notificationCheck.value)
}

onMounted(() => {
	dataStore.initializeNotificationsState()
})

const inputWidthWorkTime = computed(() => {
	const stringValue = String(localWorkTime.value).length
	const minWidth = 20
	return `${minWidth + stringValue * 8}px`
})

const inputWidthShortBreakTime = computed(() => {
	const stringValue = String(localShortBreakTime.value).length
	const minWidth = 20
	return `${minWidth + stringValue * 8}px`
})

const inputWidthLongBreakTime = computed(() => {
	const stringValue = String(localLongBreakTime.value).length
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
	<div
		class="block absolute min-h-screen w-[425px] pl-5 pr-5 border-r border-black text-lg font-medium dark:border-white"
	>
		<h1 class="pb-2 pt-2 font-bold text-xl text-center">Settings</h1>
		<hr class="min-w-full h-px border-black mb-2 mt-2 dark:border-white" />
		<h2 class="">Set Time (in min)</h2>
		<p class="block text-gray-400 text-sm pt-1 pb-2">
			This will reset the clock if you have a timer in progress.
		</p>
		<form
			class="block mb-2"
			@submit.prevent="handleSubmit"
		>
			<div class="mb-4 flex items-center">
				<label class="block w-1/2">Work time:</label>
				<input
					v-model="localWorkTime"
					class="border-b border-black outline-none opacity-none w-12 bg-transparent text-center dark:border-white"
					:style="{ width: inputWidthWorkTime }"
					type="number"
					min="0"
				/>
			</div>

			<div class="mb-4 flex items-center">
				<label class="block w-1/2">Break time:</label>
				<input
					v-model="localShortBreakTime"
					class="border-b border-black outline-none opacity-none bg-transparent w-12 text-center dark:border-white"
					:style="{ width: inputWidthShortBreakTime }"
					type="number"
					min="0"
				/>
			</div>

			<div class="mb-4 flex items-center">
				<label class="block w-1/2">Long break time:</label>
				<input
					v-model="localLongBreakTime"
					class="border-b border-black outline-none opacity-none bg-transparent w-12 text-center dark:border-white"
					:style="{ width: inputWidthLongBreakTime }"
					type="number"
					min="0"
				/>
			</div>
		</form>
		<hr class="min-w-full h-px border-black mb-2 mt-2 dark:border-white" />
		<div class="flex justify-center">
			<button
				class="h-10 w-52 border rounded-2xl border-black dark:border-white"
				type="submit"
				@click="handleSubmit"
			>
				Set Time
			</button>
		</div>

		<hr class="min-w-full h-px border-black mb-2 mt-2 dark:border-white" />
		<h2>Other Settings</h2>
		<div class="mb-4 flex items-center">
			<label class="block w-1/2">Dark mode</label>
			<label class="switch">
				<input
					v-model="isDark"
					type="checkbox"
				/>
				<span
					class="slider round border rounded-2xl border-black dark:border-wheat"
				></span>
			</label>
		</div>
		<div class="mb-4 flex items-center">
			<label class="block w-1/2">Notification</label>
			<label class="switch">
				<input
					v-model="notificationCheck"
					type="checkbox"
					@change="updateNotificationSetting"
				/>
				<span
					class="slider round border rounded-2xl border-black dark:border-wheat"
				></span>
			</label>
		</div>
	</div>
</template>

<style scoped>
.circle-label:first-child .circle-input:checked + .circle-span {
	box-shadow: 0 0 0 2px white;
}
.circle-input:checked + .circle-span {
	box-shadow: 0 0 0 2px white;
}
.switch {
	position: relative;
	display: inline-block;
	width: 44px;
	height: 24px;
}

.switch input {
	display: none;
}

/* The slider */
.slider {
	position: absolute;
	cursor: pointer;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	background-color: transparent;
	-webkit-transition: 0.4s;
	transition: 0.4s;
}

.slider:before {
	position: absolute;
	content: '';
	height: 20px;
	width: 20px;
	left: 4px;
	bottom: 1px;
	background-color: white;
	-webkit-transition: 0.4s;
	transition: 0.4s;
}

input:checked + .slider {
	background-color: black;
}

input:focus + .slider {
	box-shadow: 0 0 1px #2196f3;
}

input:checked + .slider:before {
	-webkit-transform: translateX(px);
	-ms-transform: translateX(20px);
	transform: translateX(12px);
}

/* Rounded sliders */
.slider.round {
	border-radius: 34px;
}

.slider.round:before {
	border-radius: 50%;
}
</style>
