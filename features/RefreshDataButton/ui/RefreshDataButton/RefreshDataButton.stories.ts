import { type Meta, type StoryObj } from '@storybook/vue3';
import RefreshDataButton from './RefreshDataButton.vue';


const meta = {
	title: 'features/RefreshDataButton',
	component: RefreshDataButton,
	tags: ['autodocs'],
	argTypes: {},
} satisfies Meta<typeof RefreshDataButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
	args: {
		
	},
};
export const WithSlot: Story = {
	args: {
		default: 'Slot text'
	},
	
};