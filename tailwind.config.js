/** @type {import('tailwindcss').Config} */
export default {
	content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
	darkMode: 'class',
	theme: {
		extend: {
			colors: {
				wheat: '#f5deb3'
			},
			boxShadow: {
				left: '5px 5px 5px 1px rgb(0 0 0 / 0.1)'
			}
		}
	},
	plugins: []
}
