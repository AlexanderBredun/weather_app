import type { Meta, StoryObj } from '@storybook/vue3';
import CloseLocationButton from './CloseLocationButton.vue';


const meta = {
	title: 'features/CloseLocationButton',
	component: CloseLocationButton,
	tags: ['autodocs'],
	argTypes: {},
} satisfies Meta<typeof CloseLocationButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
	args: {
		parentId: 'parent-id'
	},
};