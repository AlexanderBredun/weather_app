<template>
    <div>
        <AppLoader v-if="loading" class="block mx-auto" />
        <ul v-else>
            <li v-for="(item, i) in locations" :key="item.id"
                class="flex flex-col group overflow-hidden justify-center px-20 py-8 h-96 mb-8 last:mb-0 bg-def-bg shadow-def-bg shadow-def border-blue-600 border hover:bg-blue-700 transition-all duration-300 rounded-xl relative">
                <a href="#" role="button" class="block w-full h-full absolute top-0 left-0"
                   @click.prevent="locationClicked(i)">

                </a>
                <h4 v-if="i === 0" class="mb-4 bg-fuchsia-600 w-fit px-6 py-2 rounded-full">
                    My Location
                </h4>
                <h3 class="text-base">
                    {{ item.city }}
                </h3>
                <template v-if="items?.length">
                    <h2 class="mb-4">
                        {{ items[i]?.temperature }} °C
                    </h2>
                    <h4 class="mb-4 text-base">
                            {{ WEATHER_CODES(items[i].status).text }}
                        </h4>
                    <p class="text-sm">
                        <span class="pr-8">Highest: {{ items[i].maxToday }} °C</span> <span>Lowest: {{
                            items[i].minToday }} °C</span>
                    </p>

                    <div class="absolute top-0 -right-20 sm:-right-60 h-full w-1/2 opacity-30 py-8 px-4 flex flex-col justify-center transition-all group-hover:opacity-100">

                        <WeatherImage class="w-full mx-auto d-block" :status="items[i].status"
                                      :time="new Date().getHours()" />
                       

                    </div>
                </template>


            </li>
        </ul>
    </div>
</template>

<script lang="ts" setup>
import { storeToRefs } from 'pinia';
import { WEATHER_CODES } from '~/shared/lib/utils';
import AppLoader from '~/shared/ui/AppLoader/AppLoader.vue';
import WeatherImage from '~/shared/ui/WeatherImage/WeatherImage.vue';
import { useAllLocationsStore } from '../../store/useAllLocationsStore';

const hide = inject<()=> void>('hideSlidePage');
const store = useMainStore();
const { slideToLocation, locations } = storeToRefs(store);

const storeLocations = useAllLocationsStore();
const { items, loading } = storeToRefs(storeLocations);


const locationClicked = (i: number) => {
	if(hide){
		hide();
	}
	
	slideToLocation.value = i;
};


watch(()=> locations.value, (val) => {
	storeLocations.fetchAllLocationsInfo();
}, { immediate: true });

</script>

<style></style>