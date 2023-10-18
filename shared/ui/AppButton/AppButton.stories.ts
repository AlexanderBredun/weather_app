import type { Meta, StoryObj } from '@storybook/vue3';
import AppButton from './AppButton.vue';


const meta = {
	title: 'shared/AppButton',
	component: AppButton,
	tags: ['autodocs'],
	argTypes: {},
	args: {
		default: 'Button name'
	},
} satisfies Meta<typeof AppButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
	args: {
		
	},
};
export const SizeMedium: Story = {
	args: {
		size: 'md'
	},
};
export const SizeLarge: Story = {
	args: {
		size: 'lg'
	},
};
export const VariantClear: Story = {
	args: {
		variant: 'clear'
	},
};