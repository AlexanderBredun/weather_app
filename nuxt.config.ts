// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	app: {
		head: {
			title: 'Weather Guess',
			meta: [
				{ hid: 'charset', charset: 'utf-8' },
				{ hid: 'viewport', name: 'viewport', content: 'width=device-width, initial-scale=1, maximum-scale=1, shrink-to-fit=no' },
				{ hid: 'title', name: 'title', content: 'Weather Guess App' },
				{ hid: 'og:title', name: 'og:title', content: 'Weather Guess App' },
				{ hid: 'description', name: 'description', content: 'Weather Guess - app for weather forecast' },
				{ hid: 'og:description', name: 'og:description', content: 'Weather Guess - app for weather forecast' },
				{ name: 'format-detection', content: 'telephone=no' },
			],
			link: [
				{ hid: 'shortcut-icon', rel: 'shortcut icon', href: '/32x32.png' },
				{ rel: 'mask-icon', color: '#181818', href: '/safari-pinned-tab.svg' },
				{ rel: 'apple-touch-icon', href: '/60x60.png' },
				{ rel: 'apple-touch-icon', sizes: '76x76', href: '/76x76.png' },
				{ rel: 'apple-touch-icon', sizes: '120x120', href: '/120x120.png' },
				{ rel: 'preconnect', href: 'https://fonts.googleapis.com' },
				{ rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: 'anonymous' },
				{ rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Quicksand:wght@300;400;500;700&display=swap' },
				{ rel: 'stylesheet', href: 'https://pro.fontawesome.com/releases/v5.10.0/css/all.css', integrity: 'sha384-AYmEC3Yw5cVb3ZcuHtOA93w35dYTsvhLPVnYs9eStHfGJvOvKxVfELGroGkvsg+p', crossorigin: 'anonymous' },
			],

		},
	},
	devtools: { enabled: true },
	typescript: {
		typeCheck: true
	},
	modules: [
		'@pinia/nuxt',
		'@nuxtjs/tailwindcss',
		'nuxt-icons'
	],
	ssr: false,
	
	runtimeConfig: {
		app: {
			name: 'Nuxt',
			version: '1.0.0',
			baseURL: '/',
			host: 'localhost',
			port: 3000,
		  },
		public: {
			apiWeatherBase: 'https://api.open-meteo.com/v1/forecast',
		}
	},
	// storybook: {
	// 	// Options
	// 	url: 'http://localhost:6006',
	// 	port: 6006,
	// 	storybookRoute: '/_storybook',
	// 	devtools: true
	//   },
	imports: {
		dirs: ['./shared/store'],
	  },
	css: ['@/shared/lib/styles/main.scss'],
	vite: {
		// base: '/_nuxt/',
		css: {
			preprocessorOptions: {
				scss: {
					additionalData: '@import "@/shared/lib/styles/_variables.scss";',
				},
			},
		},
	},
	components: false,
	tailwindcss: {
		cssPath: '@/shared/styles/tailwind.css',
		
		viewer: true,
	},
});
