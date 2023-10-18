import type { Meta, StoryObj } from '@storybook/vue3';
import AppDropdown from './AppDropdown.vue';


const meta = {
	title: 'shared/AppDropdown',
	component: AppDropdown,
	tags: ['autodocs'],
	argTypes: {},
} satisfies Meta<typeof AppDropdown>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
	args: {
		title: 'Title',
		content(_) {
			return 'asdasd';
		},
	},
};