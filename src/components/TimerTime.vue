<script setup>
import TimerDigit from './TimerDigit.vue'

const props = defineProps({
	seconds: {
		type: Number,
		default: 0
	},
	minutes: {
		type: Number,
		default: 0
	}
})
</script>
<template>
	<div>
		<div class="-mt-10 mb-10 text-6xl">
			<TimerDigit :digit="props.minutes" />

			<TimerDigit
				class="-mt-5"
				:digit="props.seconds"
			/>
		</div>
	</div>
</template>
