import type { Meta, StoryObj } from '@storybook/vue3';
import WeatherImage from './WeatherImage.vue';


const meta = {
	title: 'shared/WeatherImage',
	component: WeatherImage,
	tags: ['autodocs'],
	argTypes: {},
} satisfies Meta<typeof WeatherImage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
	args: {
		status: 0
	},
};
export const WithTime: Story = {
	args: {
		status: 0,
		time: 24
	},
};