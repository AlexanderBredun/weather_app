import type { Meta, StoryObj } from '@storybook/vue3';
import AddMoreInfoDropdown from './AddMoreInfoDropdown.vue';


const meta = {
	title: 'features/AddMoreInfoDropdown',
	component: AddMoreInfoDropdown,
	tags: ['autodocs'],
	argTypes: {},
} satisfies Meta<typeof AddMoreInfoDropdown>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
	args: {
		parentId: '34',
		blocks: [
			{
				displayName: 'Block name',
				id: '1',
				name: 'DailyWeatherTile',
				size: 'large',
				refresh: '21'
			},
			{
				displayName: 'Block name 1',
				id: '2',
				name: 'MainInfoTile',
				size: 'large',
				refresh: '21'
			},
			{
				displayName: 'Block name 2',
				id: '3',
				name: 'HourlyWeatherTile',
				size: 'large',
				refresh: '21'
			},
		]
	},
};