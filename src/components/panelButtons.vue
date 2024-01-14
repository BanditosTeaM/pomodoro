<script setup>
import { ref } from 'vue'
const activeTitle = ref('')
const data = [
	{ key: 'settings', title: 'Settings' },
	{ key: 'history', title: 'History' }
]

const props = defineProps({
	isModalSettingsOpen: Boolean,
	isModalHistoryOpen: Boolean
})
const burgerMenu = ref(false)

const emit = defineEmits([
	'update:is-modal-settings-open',
	'update:is-modal-history-open'
])

const toggleBurgerMenu = () => {
	burgerMenu.value = !burgerMenu.value
}
const togglePanel = key => {
	if (key === 'history') {
		emit('update:is-modal-history-open', !props.isModalHistoryOpen)
		emit('update:is-modal-settings-open', false)
	}

	if (key === 'settings') {
		emit('update:is-modal-settings-open', !props.isModalSettingsOpen)
		emit('update:is-modal-history-open', false)
	}

	activeTitle.value = key
}
</script>

<template>
	<div class="flex flex-col pt-2 max-md:hidden">
		<div
			class="flex flex-col justify-center -ml-[5px] px-1 py-1 dark:border-white"
		>
			<button
				v-for="item in data"
				:key="item.key"
				class="border mt-3 border-black border-solid rounded-r-lg h-8 w-24 hover:text-white"
				:class="
					(props.isModalHistoryOpen || props.isModalSettingsOpen) == false
						? 'bg-transparent'
						: activeTitle === item.key
						  ? 'border-2 border-white border-dashed'
						  : 'border-black'
				"
				@click="togglePanel(item.key)"
			>
				{{ item.title }}
			</button>
		</div>
	</div>

	<div class="max-md:flex hidden z-10">
		<button
			class="absolute w-8 h-8 top-2 right-2 z-20"
			@click="toggleBurgerMenu"
		>
			<div class="flex flex-col items-center">
				<div
					class="bg-black h-5 w-[2px] rounded-full"
					:class="burgerMenu ? '-mb-2 rotate-45' : 'rotate-90'"
				></div>
				<div
					class="bg-black h-5 w-[2px] rounded-full -mt-3"
					:class="burgerMenu ? 'hidden' : 'rotate-90'"
				></div>
				<div
					class="bg-black h-5 w-[2px] rounded-full -mt-3"
					:class="burgerMenu ? '-rotate-45' : 'rotate-90'"
				></div>
			</div>
		</button>
		<div v-if="burgerMenu">
			<div
				class="absolute w-full h-full bg-slate-300 flex items-center justify-center flex-col text-4xl dark:bg-black"
			>
				<button
					v-for="item in data"
					:key="item.key"
					class="h-7 my-4 hover:text-white"
					@click="togglePanel(item.key)"
				>
					{{ item.title }}
				</button>
			</div>
		</div>
	</div>
</template>
