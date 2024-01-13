<script setup>
import { computed } from 'vue'

const props = defineProps({
	digit: {
		type: Number,
		required: true
	}
})

const timerlDigit = computed(() => {
	if (props.digit >= 10) {
		return props.digit.toString()
	}

	return '0' + props.digit.toString()
})
</script>

<template>
	<div class="container">
		{{ timerlDigit }}
	</div>
</template>
