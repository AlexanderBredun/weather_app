<template>
    <SlideInSection :show-status="route.query['all-cities'] === null" @hide="hide">
        <Loader v-if="loading" class="block mx-auto"/>
        <ul v-else>
            <li v-for="(item, i) in locations" :key="item.id"
                class="flex flex-col justify-center px-20 py-8 h-96 mb-8 last:mb-0 bg-def-bg shadow-def-bg shadow-def border-blue-600 border hover:bg-blue-700 transition-all duration-300 rounded-xl relative">
                <a href="#" role="button" class="block w-full h-full absolute top-0 left-0"
                    @click.prevent="locationClicked(i)">

                </a>
                <h4 v-if="i === 0" class="mb-4">
                    My Location
                </h4>
                <h3>
                    {{ item.city }}
                </h3>
                <template v-if="locationsWeather.length">
                    <h2 class="mb-4">
                        {{ locationsWeather[i]?.temperature }} °C
                    </h2>
                    <p>
                        <span class="pr-8">Highest: {{ locationsWeather[i].maxToday }} °C</span> <span>Lowest: {{
                            locationsWeather[i].minToday }} °C</span>
                    </p>

                    <div v-if="locationsWeather.length"
                        class="absolute top-0 right-0  h-full py-8 px-4 flex flex-col justify-center">

                        <WeatherImage class="w-64 mx-auto d-block" :status="locationsWeather[i].status"
                            :time="new Date().getHours()" />
                        <h4 class="text-center mb-0">
                            {{ WEATHER_CODES(locationsWeather[i].status)?.text }}
                        </h4>

                    </div>
                </template>


            </li>
        </ul>
    </SlideInSection>
</template>

<script lang="ts" setup>

import SlideInSection from '@/components/layouts/SlideInSection.vue'
import weatherService from '@/services/weatherService'
import WeatherImage from '@/components/shared/ui/WeatherImage.vue'
import { ref, watch } from 'vue';
import { WEATHER_CODES } from '@/utils/constants'
import Loader from '@/components/shared/Loader.vue'
import type { Ref } from "vue"
import { IMainInfoTransformed } from '~/types/transormedData';




definePageMeta({
    pageTransition: {
        name: 'page',
        mode: 'out-in' // default
    }

})
const route = useRoute()
const router = useRouter()

const store = useMainStore()
const { locations, slideToLocation, loading } = storeToRefs(store);
const config = useRuntimeConfig()
const hide = () => {
    let query = Object.assign({}, route.query);
    delete query['all-cities'];
    router.replace({ query });
}

const locationClicked = (i: number) => {
    hide()
    slideToLocation.value = i;
}

const locationsWeather: Ref<[] | Array<IMainInfoTransformed>> = ref([])

watch(locations.value, async (val) => {
    const allPromises = await locations.value.map(el => {
        return $fetch(weatherService.getMainInfo(el.pos, el.timezone), { baseURL: config.apiWeatherBase },)
    })
    const res = await Promise.all(allPromises)
        .then(values => {
            // @ts-ignore
            return values.map(weatherService.mainInfoFormatter)
        })
    locationsWeather.value = res as Array<IMainInfoTransformed>
}, { immediate: true })

</script>

<style></style>