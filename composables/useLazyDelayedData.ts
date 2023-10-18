
import { useMainStore } from '@/store/index'
import { useStructureStore, findPropertyById } from '@/store/structure'
import weatherService from '@/services/weatherService'
import { watch, ref } from 'vue'
import { v4 as uuidv4 } from 'uuid';
import { IPos } from '~/types/IPos'




const config = useRuntimeConfig()

export const useLazyDelayedData = async(
    idParent: string,
    getMethod: string,
    formatMethod: string,
    posIn?: IPos,
    timezone?: string,
): Promise<any>=>{

    const store = useMainStore()
const storeStructure = useStructureStore()
const { addRefreshMethod} = storeStructure;
const { locationsStructurees } = storeToRefs(storeStructure);

  
   const activePos = ref(posIn);
  
    const idFetch = uuidv4();
    // @ts-ignore
    const { data, pending, refresh, error } = await useLazyAsyncData(
        idFetch,
         // @ts-ignore
        async () => {
             // @ts-ignore
            return await useDelayedPromise(
                // @ts-ignore
                async () => await $fetch(weatherService[getMethod](activePos.value, timezone), { baseURL: config.public['apiWeatherBase'] }),
                data.value ? 0 : 400
            )
               // @ts-ignore
        }, { immediate: true, transform: (e) => formatMethod ? weatherService[formatMethod](e) : e }
    )
    const isInStore = findPropertyById(locationsStructurees.value, idParent);
    
    if(isInStore){
        addRefreshMethod(idParent, idFetch)
    }
   
  
   watch(activePos, (e) =>{
    refresh()
   })
  
    return {
        data,
         pending,
          refresh,
           error
    };
  }