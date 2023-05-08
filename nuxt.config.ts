// https://nuxt.com/docs/api/configuration/nuxt-config
import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({
    modules: [
        '@nuxt/image-edge',
        '@nuxtjs/tailwindcss',
        'nuxt-icons',
        [
            '@pinia/nuxt',
            {
                autoImports: ['defineStore', 'acceptHMRUpdate', 'storeToRefs'],
            },
        ]

    ],
   
    imports: {
        dirs: ['store'],
    },
    runtimeConfig: {
        public: {
            apiWeatherBase: 'https://api.open-meteo.com/v1/forecast',
        }
    },
    css: ["@/assets/styles/main.scss"],

    vite: {
       // base: '/_nuxt/',
        css: {
            preprocessorOptions: {
                sass: {
                    additionalData: '@import "@/assets/styles/_variables.scss";',
                },
            },
        },
    },
    tailwindcss: {
        cssPath: '~/assets/css/tailwind.css',
        configPath: '~/utils/tailwind.js',
        exposeConfig: false,
        injectPosition: 0,
        viewer: true,
    },
    image: {
        cloudinary: {
            cloudinary: {
                baseURL: 'https://res.cloudinary.com/dgsoeeawo/image/upload/',

                modifiers: {
                    quality: 'auto:best',
                    format: 'auto',
                }
            }
        }
    },
    typescript: {
        typeCheck: true,
        tsConfig: {
            "extends": "../../../tsconfig.base.json"
          }
    },
   
    ssr: false,
 
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
                { hid: "shortcut-icon", rel: 'shortcut icon', href: '/32x32.png' },
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
    }
})
