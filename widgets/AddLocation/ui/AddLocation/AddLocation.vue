<template>
    <SearchLocation />
    <NewLocationPreview />
</template>

<script lang="ts" setup>
import { storeToRefs } from 'pinia';
import { useDebounce } from '~/shared/hooks';
import { useAddLocationStore } from '../../store/useAddLocationStore';
import NewLocationPreview from '../NewLocationPreview/NewLocationPreview.vue';
import SearchLocation from '../SearchLocation/SearchLocation.vue';


const addLocStore = useAddLocationStore();
const { search } = storeToRefs(addLocStore);

const debouncedSearchResult = useDebounce(addLocStore.fetchLocationsByName, 700);

watch(() => search.value, (val) => {

	if (val) {
		addLocStore.searchResult = null;
		debouncedSearchResult();
	}

});

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