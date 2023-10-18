import { storeToRefs } from 'pinia';
import { v4 as uuidv4 } from 'uuid';

export const useFetchTileData = async <T>(idParent:string, req: ()=> Promise<T>)=> {
	const idFetch = uuidv4();
	const structureStore = useStructureStore();
	const { locationsStructurees } = storeToRefs(structureStore);
	const isInStore = findPropertyById(locationsStructurees.value, idParent);

	if(isInStore){
		structureStore.addRefreshMethod(idParent, idFetch);
	}

	const { data, pending, refresh, error } = await useLazyAsyncData(
		idFetch,
		req,
	);

	return {
		data,
		pending,
		error: Boolean(error.value)
	};
};