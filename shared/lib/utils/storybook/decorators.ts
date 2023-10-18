
interface StoreSchema{
	storeMain: ReturnType<typeof useMainStore>,
	storeStructure: ReturnType<typeof useStructureStore>,
}

export const storeDecorator = (cb: (store: StoreSchema)=> void)=> ()=> {
	return  {
		setup(){
			const storeMain = useMainStore();
			const storeStructure = useStructureStore();
			cb({ storeMain, storeStructure });
		},
		template: '<story />'
	};  
};