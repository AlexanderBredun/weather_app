import type { Meta, StoryObj } from '@storybook/vue3';
import LocationHeader from './LocationHeader.vue';


const meta = {
	title: 'widgets/LocationHeader',
	component: LocationHeader,
	tags: ['autodocs'],
	argTypes: {},
} satisfies Meta<typeof LocationHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
	args: {
		availableBlocks: [{
			displayName: 'Test block',
			id: '1234',
			name: 'DailyWeatherTile',
			size: 'large',
		}],
		idLocation: '123',
		name: 'London'
	},
};