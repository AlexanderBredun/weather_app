<template>
    <ul v-if="searchResult?.length && search && searchFocused"  class="w-full bg-gray-700 absolute top-full left-0 z-40" >
        <li v-for="(item) in searchResult" :key="item.id" class=" p-4 pl-10 text-sm text-white hover:bg-gray-500 cursor-pointer"
            @click="setActiveLocation(item)">
            <p v-html="nameHighlight(item)"></p>
        </li>
    </ul>
    <div v-else-if="searchResult && !searchResult.length && !activeLocation && search && !loading"
         class="w-full absolute top-[200%] left-1/2 -translate-x-1/2 text-center">
        <svg aria-hidden="true" class="w-20 h-20 text-gray-500 dark:text-gray-400 mx-auto" fill="none" stroke="currentColor"
             viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
        </svg>
        <h3>
            No Results
        </h3>
        <p class="break-words">
            No results found for &quot;{{ search }}&quot;
        </p>
    </div>
</template>

<script lang="ts" setup>
import { storeToRefs } from 'pinia';
import { iGeocodeDone } from '~/shared/lib/types';
import { useAddLocationStore } from '../../store/useAddLocationStore';

const addLocStore = useAddLocationStore();
const { search, searchResult, activeLocation, searchFocused, loading } = storeToRefs(addLocStore);

const nameHighlight = (item: iGeocodeDone): string => {
	const fullName = `${item.name}, ${item.country}`;
	return fullName.toLowerCase().replace(search.value, `<span class="text-red-600">${search.value}</span>`);
};
const setActiveLocation = (item: iGeocodeDone): void => {
	searchFocused.value = false;
	addLocStore.activeLocation = item;
};
</script>

<style lang="scss" scoped></style>