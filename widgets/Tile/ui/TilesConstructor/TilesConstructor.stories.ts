import type { Meta, StoryObj } from '@storybook/vue3';
import { structureDefault, mockStoreLocation, mockStoreLocationStructure } from '~/shared/lib/utils';
import { storeDecorator } from '~/shared/lib/utils/storybook/decorators';
import TilesConstructor from './TilesConstructor.vue';


const meta = {
	title: 'widgets/Tile/TilesConstructor',
	component: TilesConstructor,
	tags: ['autodocs'],
	argTypes: {},
} satisfies Meta<typeof TilesConstructor>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
	decorators: [storeDecorator(({ storeMain, storeStructure }) => {
		storeStructure.locationsStructurees = mockStoreLocationStructure;
		storeMain.loading = false;
		storeMain.locations = [mockStoreLocation];
	})],
	args: {
		parentId: '123',
		posData: {
			pos: {
				lat: 20,
				long: 40
			},
			timezone: 'Europe/Paris'
		},
		structure: structureDefault()
	},
};
export const Empty: Story = {
	decorators: [storeDecorator(({ storeMain, storeStructure }) => {
		storeStructure.locationsStructurees = mockStoreLocationStructure;
		storeMain.loading = false;
		storeMain.locations = [mockStoreLocation];
	})],
	args: {
		parentId: '123',
		posData: {
			pos: {
				lat: 20,
				long: 40
			},
			timezone: 'Europe/Paris'
		}
	},
};