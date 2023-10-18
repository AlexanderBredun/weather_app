import type { Meta, StoryObj } from '@storybook/vue3';
import WeatherStateItem from './WeatherStateItem.vue';


const meta = {
	title: 'entities/WeatherStateItem',
	component: WeatherStateItem,
	tags: ['autodocs'],
	argTypes: {},
} satisfies Meta<typeof WeatherStateItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
	args: {
		image: {
			status: 0,
			time: 23
		},
		precipitation: 40,
		date: '2017-01-02',
		temperature: '50deg'
	},
};
export const NoRain: Story = {
	args: {
		image: {
			status: 0,
			time: 23
		},
		precipitation: 0,
		date: '2017-01-02',
		temperature: '50deg'
	},
};
export const AutoHeightLast: Story = {
	args: {
		image: {
			status: 0,
			time: 23
		},
		precipitation: 0,
		date: '2017-01-02',
		temperature: '50deg',
		autoHeightLast: true
	},
};
export const ListChild: Story = {
	name: 'Should render li tag',
	args: {
		listChild: true,
		image: {
			status: 0,
			time: 23
		},
		precipitation: 0,
		date: '2017-01-02',
		temperature: '50deg',
		autoHeightLast: true
	},
};