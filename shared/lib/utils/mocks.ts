import { iLocation, iStructureItemWithAvailableBlocks } from '../types';
import { availableBlocksDefault, structureDefault } from './consts';

export const mockStoreLocation: iLocation = {
	city: 'London',
	id: '123',
	pos: {
		lat: 23,
		long: 123
	},
	timezone: 'Europe/London'
};
export const mockStoreLocationStructure: Record<string, iStructureItemWithAvailableBlocks> = {
	'123': {
		structure: structureDefault(),
		availableBlocks: availableBlocksDefault()
	}
};