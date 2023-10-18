import type { Meta, StoryObj } from '@storybook/vue3';
import CloseTileButton from './CloseTileButton.vue';


const meta = {
	title: 'features/CloseTileButton',
	component: CloseTileButton,
	tags: ['autodocs'],
	argTypes: {},
} satisfies Meta<typeof CloseTileButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
	args: {
		parentId: '123'
	},
};