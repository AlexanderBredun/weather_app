import type { Meta, StoryObj } from '@storybook/vue3';
import AddLocationInput from './AddLocationInput.vue';


const meta = {
	title: 'widgets/AddLocation/AddLocationInput',
	component: AddLocationInput,
	tags: ['autodocs'],
	argTypes: {},
} satisfies Meta<typeof AddLocationInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
	args: {
		
	},
};