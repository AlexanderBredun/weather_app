import type { Meta, StoryObj } from '@storybook/vue3';
import PrecipitationText from './PrecipitationText.vue';


const meta = {
	title: 'entities/PrecipitationText',
	component: PrecipitationText,
	tags: ['autodocs'],
	argTypes: {},
} satisfies Meta<typeof PrecipitationText>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
	args: {
		rain: 30,
		snow: 40
	},
};