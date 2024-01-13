import { defineConfig } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'
import path from 'path'
import vue from '@vitejs/plugin-vue'
import svgLoader from 'vite-svg-loader'

export default defineConfig({
	resolve: {
		alias: {
			'@': path.resolve(__dirname, './src'),
			'@assets': path.resolve(__dirname, './src/assets'),
			'@components': path.resolve(__dirname, './src/components'),
			'@composables': path.resolve(__dirname, './src/composables'),
			'@config': path.resolve(__dirname, './src/config'),
			'@constants': path.resolve(__dirname, './src/constants'),
			'@helpers': path.resolve(__dirname, './src/helpers'),
			'@store': path.resolve(__dirname, './src/store'),
			'@utils': path.resolve(__dirname, './src/utils')
		}
	},
	define: {
		__VUE_PROD_HYDRATION_MISMATCH_DETAILS__: 'false'
	},
	plugins: [
		vue(),
		svgLoader({
			defaultImport: 'component'
		}),
		VitePWA({
			registerType: 'autoUpdate',
			devOptions: {
				enabled: true
			},
			manifest: {
				name: 'Pomodoro timer',
				short_name: 'pomodoro',
				description: 'Pomodoro timer Vue 3 + Vite',
				start_url: '/',
				theme_color: '#ffffff',
				icons: [
					{
						src: '/src/assets/logo16x16.png',
						sizes: '16x16',
						type: 'image/png'
					},
					{
						src: '/src/assets/logo32x32.png',
						sizes: '32x32',
						type: 'image/png'
					},

					{
						src: '/src/assets/logo196x196.png',
						sizes: '196x196',
						type: 'image/png'
					}
				],
				screenshots: [
					{
						src: '/src/assets/screenshot-desktop.png',
						sizes: '1280x800',
						type: 'image/png',
						form_factor: 'wide'
					},
					{
						src: '/src/assets/screenshot-mobile.png',
						sizes: '640x1280',
						type: 'image/png',
						form_factor: 'notched'
					}
				]
			}
		})
	]
})
