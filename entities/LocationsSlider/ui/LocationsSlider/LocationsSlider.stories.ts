import type { Meta, StoryObj } from '@storybook/vue3';
import { structureDefault, availableBlocksDefault } from '~/shared/lib/utils';
import { storeDecorator } from '~/shared/lib/utils/storybook/decorators';
import LocationsSlider from './LocationsSlider.vue';

const meta = {
	title: 'entities/LocationsSlider',
	component: LocationsSlider,
	tags: ['autodocs'],
	
	argTypes: {},
} satisfies Meta<typeof LocationsSlider>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = { 
	args: {
		
	},
	decorators: [storeDecorator(({ storeMain, storeStructure })=> {
		storeStructure.locationsStructurees = {
			'123': {
				structure: structureDefault(),
				availableBlocks: availableBlocksDefault()
			}
		};
		storeMain.loading = false;
		storeMain.locations = [{
			city: 'London',
			id: '123',
			pos: {
			  lat: 23,
			  long: 123
			},
			timezone: 'Europe/London'
		  }];
	})],
};
export const Loading: Story = {
	args: {
		
	},
	decorators: [() => ({
		setup(){
			const storeMain = useMainStore();
			
			storeMain.loading = true;
			
		},
		 template: '<story />'
		 })],
};
export const Error: Story = {
	args: {
		
	},
	decorators: [() => ({
		setup(){
			const storeMain = useMainStore();
			
			storeMain.loading = false;
			storeMain.locations = [];
			
		},
		 template: '<story />'
		 })],
};