 // @ts-ignore
import { FunctionArgs } from '@vueuse/core'

import { ref } from 'vue'

const data = ref([]);
let controller: AbortController = new AbortController();
let timer: undefined | ReturnType<typeof setTimeout> = undefined;
const loading = ref<boolean>(false)

export const useFetchThrottle = async<T extends FunctionArgs>(
    valueRaw: string,
    getMethod: string,
    formatMethod: Function,
): Promise<ReturnType<T>> => {

    const value = valueRaw.trim();

    controller.abort()
    controller = new AbortController()
    clearTimeout(timer)
    loading.value = true;

    timer = setTimeout(async () => {
        if (value) {
           
            await $fetch(getMethod, {
                signal: controller.signal,
            }).then((res) => {
               
                if (formatMethod) {
                    data.value = formatMethod(res)
                }

            })
                .finally(() => loading.value = false)

        }

    }, 700)

    return {
        loading,
        data
    } as ReturnType<T>;

}