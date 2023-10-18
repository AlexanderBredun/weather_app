/** @type {import('tailwindcss').Config} */
import colors from 'tailwindcss/colors';
export default {
	content: [
		'./shared/**/*.{js,vue,ts}',
		'./entities/**/*.{js,vue,ts}',
		'./widgets/**/*.{js,vue,ts}',
		'./features/**/*.{js,vue,ts}',
		'./layouts/**/*.vue',
		'./pages/**/*.vue',
		'./plugins/**/*.{js,ts}',
		'./nuxt.config.{js,ts}',
	],
	theme: {
     
		fontFamily: {
			sans: ['Quicksand', 'sans-serif'],
			serif: ['Quicksand', 'sans-serif'],
			mono: ['Quicksand', 'sans-serif'],
			display: ['Quicksand', 'sans-serif'],
			body: ['Quicksand', 'sans-serif']
		},
		fontSize: {
			sm: ['1.4rem', '1.4'],
			base: ['1.8rem', '1.4'],
			lg: ['2.5rem', '1.3'],
			xl: ['5rem', '1.2'],
		},
		screens: {
			'sm': '576px',
			'md': '768px',
			'lg': '992px',
			'xl': '1200px',
		},
		extend: {
			spacing: {
				sm: '1.3rem',
				md: '2rem',
				lg: '4rem',
				xl: '8rem',
			},
			colors: {
				'def-bg': colors.indigo['700'],
				'def-text': colors.purple['50'],
			},
			boxShadow: {
				'def': '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 37px -2px rgb(0 0 0 / 0.1)'
			}
       
		}
	},
	plugins: [],
};

