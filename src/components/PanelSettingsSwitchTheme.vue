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
		<fieldset class="switcher">
			<legend class="switcher_legend">Схема</legend>
			<input
				v-model="localModel"
				class="switcher_radio switcher_radio-light"
				type="radio"
				value="light"
				name="color-scheme"
			/>
			<input
				v-model="localModel"
				class="switcher_radio switcher_radio-auto"
				type="radio"
				value="auto"
				name="color-scheme"
				checked
			/>
			<input
				v-model="localModel"
				class="switcher_radio switcher_radio-dark"
				type="radio"
				value="dark"
				name="color-scheme"
			/>
			<div
				class="switcher_status border-[1px] border-black dark:border-wheat"
			></div>
		</fieldset>
	</div>
</template>

<style scoped>
.switcher {
	position: absolute;
	left: 40%;
	border: none;
	display: grid;
	grid-template-columns: 1fr 1fr 1fr;
	padding: 2px;
}
.switcher_legend {
	position: absolute;
	opacity: 0;
	pointer-events: none;
}
.switcher_radio {
	appearance: none;
	margin: 0;
	width: 20px;
	height: 20px;
	cursor: pointer;
	background-position: center;
	background-repeat: no-repeat;
	transition: filter 0.1s ease-in;
}
.switcher_status {
	position: absolute;
	top: 0;
	right: 0;
	bottom: 0;
	left: 0;
	z-index: -1;

	border-radius: 1rem;
	background-repeat: no-repeat;
	background-image: url('@assets/status.svg');
	background-size: 20px;
	background-position: center;
	transition: background-position 0.1s ease-in;
}

.switcher_radio:focus-visible ~ .switcher_status {
	box-shadow: 0 0 0 2px black;
}
.switcher_radio-light:checked ~ .switcher_status {
	background-position: left 2px center;
}
.switcher_radio-auto:checked ~ .switcher_status {
	background-position: center center;
}
.switcher_radio-dark:checked ~ .switcher_status {
	background-position: right 2px center;
}
</style>
