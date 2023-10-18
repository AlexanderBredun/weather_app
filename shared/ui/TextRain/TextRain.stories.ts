import type { Meta, StoryObj } from '@storybook/vue3';
import TextRain from './TextRain.vue';


const meta = {
	title: 'shared/TextRain',
	component: TextRain,
	tags: ['autodocs'],
	argTypes: {},
} satisfies Meta<typeof TextRain>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
	args: {
		default: 'TextRain',
	},
};