<script setup>
import { defineModel } from 'vue'
const props = defineProps({
	title: {
		type: String,
		required: true
	}
})

const localModel = defineModel({ type: String })
</script>

<template>
	<div class="mb-4 flex items-center">
		<h3 class="block w-1/2">{{ props.title }}</h3>
		<label class="switch">
			<input
				v-model="localModel"
				type="checkbox"
			/>
			<span
				class="slider round border rounded-2xl border-black dark:border-wheat"
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
	transform: translateX(0px);
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
