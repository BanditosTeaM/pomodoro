<script setup>
import { computed } from 'vue'

const props = defineProps({
	digit: {
		type: Number,
		required: true
	}
})
const leftDigit = computed(() =>
	props.digit.value >= 10 ? props.digit.value.toString()[0] : '0'
)
const rightDigit = computed(() => {
	if (props.digit && typeof props.digit.value !== 'undefined') {
		return props.digit.value >= 10
			? props.digit.value.toString()[1]
			: props.digit.value.toString()
	} else {
		return null
	}
})
</script>

<template>
	<div class="container">
		<div class="digital-container">
			<span class="single-digit">
				{{ leftDigit }}
			</span>
			<span class="single-digit">
				{{ rightDigit }}
			</span>
		</div>
	</div>
</template>
