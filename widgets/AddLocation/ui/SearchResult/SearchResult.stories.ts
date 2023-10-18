import type { Meta, StoryObj } from '@storybook/vue3';
import { storeDecorator } from '~/shared/lib/utils/storybook/decorators';
import { useAddLocationStore } from '../../store/useAddLocationStore';
import SearchResult from './SearchResult.vue';


const meta = {
	title: 'widgets/AddLocation/SearchResult',
	component: SearchResult,
	tags: ['autodocs'],
	argTypes: {},
} satisfies Meta<typeof SearchResult>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
	decorators: [()=> {
		return {
			setup(){
				const addLocationStore = useAddLocationStore();
				addLocationStore.search = 'united';
				addLocationStore.searchResult = [
					{
						country: 'United States',
						id: 12,
						lat: 12,
						long: 12,
						name: 'United States',
						timezone: 'Eastern/Eastern'
					}
				];
			},
			template: '<story />'
		};
	}],
	args: {
		
	},
};
export const Empty: Story = {
	decorators: [()=> {
		return {
			setup(){
				const addLocationStore = useAddLocationStore();
				addLocationStore.search = 'united';
				addLocationStore.searchResult = [
					
				];
			},
			template: '<story />'
		};
	}],
	args: {
		
	},
};