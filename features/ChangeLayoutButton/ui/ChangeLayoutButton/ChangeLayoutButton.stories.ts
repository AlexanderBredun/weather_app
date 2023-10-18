import type { Meta, StoryObj } from '@storybook/vue3';
import ChangeLayoutButton from './ChangeLayoutButton.vue';


const meta = {
	title: 'features/ChangeLayoutButton',
	component: ChangeLayoutButton,
	tags: ['autodocs'],
	argTypes: {},
} satisfies Meta<typeof ChangeLayoutButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
	args: {
		
	},
};