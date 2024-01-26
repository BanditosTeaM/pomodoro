<script setup>
const props = defineProps({
	statusTimer: {
		type: String,
		default: 'Start'
	}
})
const emits = defineEmits(['switchTimer', 'resetTimer', 'skipTimer'])
</script>

<template>
	<div
		class="flex mt-10 space-x-24 text-2xl max-sm:flex-col max-sm:justify-center max-sm:space-x-0"
	>
		<button
			class="w-full"
			@click="emits('switchTimer')"
		>
			{{ props.statusTimer }}
		</button>
		<button
			class="w-full"
			@click="emits('resetTimer')"
		>
			Restart
		</button>
		<button
			class="w-full"
			@click="emits('skipTimer')"
		>
			Next
		</button>
	</div>
</template>
