<template>
    <SlideInSection :show-status="route.query['add-location'] === null" @hide="hide">
        <form class="mb-8" @submit.prevent="findLocation">
            <label for="default-search"
                class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
            <div class="relative">
                <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <svg aria-hidden="true" class="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none"
                        stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                    </svg>
                </div>
                <input type="search" ref="inputRef" id="default-search" aria-label="Add city" name="search"
                    placeholder="Add city" @input="findLocation"
                    class="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required>

                <ul v-if="posAll.length && !pos && inputRef?.value" class="w-full bg-gray-700 absolute top-full left-0">
                    <li v-for="(item) in posAll" :key="item.id"
                        class=" p-4 pl-10 text-sm text-white hover:bg-gray-500 cursor-pointer" @click="posSet(item)">
                        <p v-html="nameHighlight(item)"></p>
                    </li>
                </ul>
                <div v-else-if="!posAll.length && !pos && inputRef?.value && !loadingAllPos"
                    class="w-full absolute top-[200%] left-1/2 -translate-x-1/2 text-center">
                    <svg aria-hidden="true" class="w-20 h-20 text-gray-500 dark:text-gray-400 mx-auto" fill="none"
                        stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                    </svg>
                    <h3>
                        No Results
                    </h3>
                    <p class="break-words">
                        No results found for &quot;{{ inputRef.value }}&quot;
                    </p>
                </div>

            </div>
        </form>
        <div v-if="pos">
            <div class="flex justify-between items-center mb-6">
                <h2 class="m-0">
                    {{ pos.name }}, {{ pos.country }}
                </h2>
                <AppButton v-if="isAlreadyInList(formatPos(pos))" @click.prevent="addLocation(formatPos(pos))">
                    Add location
                </AppButton>
            </div>

            <TilesFlow default-view :pos-data="formatPos(pos)" />
        </div>
    </SlideInSection>
</template>

<script lang="ts" setup>
import AppButton from '@/components/shared/ui/AppButton.vue'
import SlideInSection from '@/components/layouts/SlideInSection.vue'
import TilesFlow from '@/components/layouts/TilesFlow.vue'
import geocodingService from '@/services/geocodingService'
import { ref, computed } from 'vue'
import type { Ref } from 'vue'
import { IPos } from '~/types/IPos'
import { IPosByName } from '~/types/IPosByName'
import { IPosByNameTransformed } from '~/types/transormedData'

interface IPosFormated {
    timezone: string
    pos: IPos
}

definePageMeta({
    pageTransition: {
        name: 'page',
        mode: 'out-in' // default
    }

})
const route = useRoute()
const router = useRouter()

const pos = ref()
const loadingAllPos = ref<boolean>(false)
const inputRef = ref()
let timer: undefined | ReturnType<typeof setTimeout> = undefined;
const hasCurrentRequest = false
const posAll:Ref<[] | Array<IPosByNameTransformed>> = ref([])
let controller = new AbortController();


const store = useMainStore()
const { addPositionActive } = store;
const { locations, slideToLocation } = storeToRefs(store);



const hide = () => {
    let query = Object.assign({}, route.query);
    delete query['add-location'];
    router.replace({ query });
}

const formatPos = (pos: IPosByNameTransformed): IPosFormated => {
    return {
        pos: {
            lat: pos.lat,
            long: pos.long,
        },
        timezone: pos.timezone,
    }
}

const isAlreadyInList = (val: IPosFormated): boolean => {
    if (locations.value.length < 2) return true;
    return locations.value.slice(1).some(el => el.pos.lat !== val.pos.lat && el.pos.long !== val.pos.long);
}

const posSet = (item: IPosByNameTransformed) => {
    pos.value = item
    inputRef.value.value = null;
    inputRef.value.placeholder = `${item.name}, ${item.country}`
}

const nameHighlight = (item: IPosByNameTransformed): string => {
    const fullName = `${item.name}, ${item.country}`
    return fullName.toLowerCase().replace(inputRef.value.value.toLowerCase(), `<span class="text-red-600">${inputRef.value.value}</span>`)
}

const addLocation = async (posCur: IPosFormated) => {
    addPositionActive(posCur.pos)
    pos.value = null
    posAll.value = [];
    inputRef.value.value = null;
    inputRef.value.placeholder = `Enter city`
    router.push({ path: '/' });
    setTimeout(() => {
        slideToLocation.value = locations.value.length + 1;
    }, 200)
}



const findLocation = (e: Event) => {
    pos.value = null;
    const value = (e.target as HTMLInputElement).value.trim();
    if(!value){
        posAll.value = []
        return;
    }
    controller.abort()
    controller = new AbortController()
    clearTimeout(timer)
    loadingAllPos.value = true;
    timer = setTimeout(async () => {
        if (value) {
            if (hasCurrentRequest) {
                controller.abort()
            }

            await $fetch(geocodingService.getPosByName(value), {
                signal: controller.signal,
            }).then((res) => {
                posAll.value = geocodingService.getPosByNameFormatter(res as IPosByName)
            })
            .finally(()=> loadingAllPos.value = false)
        }
    
    }, 700)


}
</script>

<style>
.slide-in-enter-active,
.slide-in-leave-active {
    transition: transform 0.5s ease;
}

.slide-in-enter-from,
.slide-in-leave-to {
    transform: translate3d(-50%, 100%, 0);
}
</style>