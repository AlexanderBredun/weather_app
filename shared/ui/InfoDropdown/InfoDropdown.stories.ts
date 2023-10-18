import type { Meta, StoryObj } from '@storybook/vue3';
import InfoDropdown from './InfoDropdown.vue';


const meta = {
	title: 'shared/InfoDropdown',
	component: InfoDropdown,
	tags: ['autodocs'],
	argTypes: {},
} satisfies Meta<typeof InfoDropdown>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
	args: {
		text: 'Text info drop',
		default: 'text info'
	},
};