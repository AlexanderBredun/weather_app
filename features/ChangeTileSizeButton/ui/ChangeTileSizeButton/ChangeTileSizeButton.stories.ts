import type { Meta, StoryObj } from '@storybook/vue3';
import ChangeTileSizeButton from './ChangeTileSizeButton.vue';


const meta = {
	title: 'features/ChangeTileSizeButton',
	component: ChangeTileSizeButton,
	tags: ['autodocs'],
	argTypes: {},
} satisfies Meta<typeof ChangeTileSizeButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
	args: {
		parentId: '123'
	},
};