import type { Meta, StoryObj } from '@storybook/vue3';
import { storeDecorator } from '~/shared/lib/utils/storybook/decorators';
import MainInfoTile from './MainInfoTile.vue';


const meta = {
	title: 'widgets/Tile/MainInfoTile',
	component: MainInfoTile,
	tags: ['autodocs'],
	argTypes: {},
} satisfies Meta<typeof MainInfoTile>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
	// decorators: [storeDecorator(({})=> {

	// })],
	args: {
		pos: {
			lat: 48.38,
			long: 31.17
		},
		parentId: '123',
        
	},
};