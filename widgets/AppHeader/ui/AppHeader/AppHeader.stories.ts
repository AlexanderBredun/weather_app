import type { Meta, StoryObj } from '@storybook/vue3';
import AppHeader from './AppHeader.vue';


const meta = {
	title: 'widgets/AppHeader',
	component: AppHeader,
	tags: ['autodocs'],
	argTypes: {},
} satisfies Meta<typeof AppHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
	args: {
		
	},
};