<script setup lang="ts">
import { computed } from 'vue'
import type { Ref } from 'vue'
import Tile from '~/components/layouts/Tile.vue'
import TileResponsive from '@/components/layouts/TileResponsive.vue'
import SunriseGraphic from './ui/SunriseGraphic.vue'
import { 
    ISunsetTransformed,
 } from '@/types/transormedData'
import { IPos } from '~/types/IPos'


const props = defineProps({
    tileId: {
        type: String,
        required: true
    },
    tileSize: String,
    pos: Object as PropType<IPos>,
    timezone: String,
})

const { data: weather, pending, refresh, error }:{data: Ref<ISunsetTransformed>, pending: globalThis.Ref<boolean>, refresh: Promise<void>, error: any} = await useLazyDelayedData(props.tileId, 'getSunriseSunset', 'sunriseSunsetFormatter', props.pos, props.timezone)

const getTime = (date: string | Date): string => {
    
    
    const hours = new Date(date).getHours().toString();
    const minutes = new Date(date).getMinutes().toString();
    return `${hours.length < 2 ? '0' + hours : hours}:${minutes.length < 2 ? '0' + minutes : minutes}`
}

const getTotalDayTime = computed((): string => {
    const sunrise = new Date(weather.value.sunrise);
    const sunset = new Date(weather.value.sunset);
    const res = sunset.getTime() - sunrise.getTime();
    const hours = Math.ceil(res / (1000 * 60 * 60)).toString();
    const minutes = Math.ceil((res / (1000 * 60)) % 60).toString();
    
    return `${hours.length < 2 ? '0' + hours : hours} hours ${minutes.length < 2 ? '0' + minutes : minutes} minutes`
})

</script>

<template>
    <Tile tag="section" class=" py-14 px-12 tile" :tileId="tileId" :loading="pending" :error="error" >
        <TileResponsive desktop-classes="">
            <template #desktop>
                <div class="flex mb-12">
                    <i class="fal fa-sunset fa-lg"></i>
                    <p class=" m-0 ml-4">
                        Sunset
                    </p>
                </div>
                <h2 class="">
                    {{ getTime(weather.timeNow) }}
                </h2>
                <div v-if="tileSize === 'large'" class="sun-graph-holder flex justify-between items-end">
                    <div class="sunrise-block text-center">
                        <i class="fal fa-sunrise"></i>
                        <p>Sunrise:<br> {{ getTime(weather.sunrise) }}</p>
                    </div>
                    <SunriseGraphic class="mx-8" :data="weather" />
                    <div class="sunset-block text-center">
                        <i class="fal fa-sunset"></i>
                        <p>Sunset:<br> {{ getTime(weather.sunset) }}</p>
                    </div>
                </div>
                <div v-else class="sun-graph-holder ">
                    <SunriseGraphic class="mb-4" :data="weather" />
                    <div class="flex justify-between items-end">
                        <div class="sunrise-block text-center">
                        <i class="fal fa-sunrise"></i>
                        <p>Sunrise:<br> {{ getTime(weather.sunrise) }}</p>
                    </div>
                    
                    <div class="sunset-block text-center">
                        <i class="fal fa-sunset"></i>
                        <p>Sunset:<br> {{ getTime(weather.sunset) }}</p>
                    </div>
                    </div>
                   
                </div>
                

            </template>

            <template #mobile>
                <div class="flex mb-12">
                    <i class="fal fa-sunset fa-lg"></i>
                    <p class=" m-0 ml-4">
                        Sunset
                    </p>
                </div>
                <h2 class="text-center">
                    {{ getTime(weather.timeNow) }}
                </h2>
                
                <div class="sun-graph-holder ">
                    <div class="flex justify-between items-end">
                        <div class="sunrise-block text-center">
                        <i class="fal fa-sunrise"></i>
                        <p>Sunrise:<br> {{ getTime(weather.sunrise) }}</p>
                    </div>
                    
                    <div class="sunset-block text-center">
                        <i class="fal fa-sunset"></i>
                        <p>Sunset:<br> {{ getTime(weather.sunset) }}</p>
                    </div>
                    </div>
                   
                </div>
            </template>

            <template #mobile-popup>
               
                <div class="flex mb-12 sticky top-0 backdrop-blur-sm bg-blue-500/50 m-0 pb-4 pt-12">
                    <i class="fal fa-sunset fa-lg"></i>
                    <p class=" m-0 ml-4">
                        Sunset
                    </p>
                </div>
                <h2 class="">
                    {{ getTime(weather.timeNow) }}
                </h2>
                <SunriseGraphic class="mb-12" :data="weather" />
                <ul class="divide-y divide-blue-400">
                    <li class="flex justify-between items-center h-40">
                        <p >
                            <i class="fal fa-sunrise"></i>
                            <span>
                                Sunrise:
                            </span>
                        </p>
                        <p>
                            {{ getTime(weather.sunrise) }}
                        </p>
                    </li>
                    <li class="flex justify-between items-center h-40">
                        <p>
                            <i class="fal fa-sunset"></i>
                            <span>
                                Sunset:
                            </span>
                        </p>
                        <p>
                            {{ getTime(weather.sunset) }}
                        </p>
                    </li>
                    <li class="flex justify-between items-center h-40">
                        <p>
                            <i class="fal fa-sun"></i>
                            <span>
                                Total day time:
                            </span>
                        </p>
                        <p>
                            {{ getTotalDayTime }}
                        </p>
                    </li>
                </ul>

            </template>
        </TileResponsive>
    </Tile>
</template>



<style lang="scss" scoped>
@import "assets/styles/variables";



.tile {
    &.small {
        iframe {
            max-width: 10rem;
        }
    }



    &.large {
        justify-content: center;

        .image-block {
            max-width: 20%;

            @include md {
                max-width: 100%;
            }
        }

        .aside-block {
            max-width: 80%;

            @include md {
                max-width: 35%;
            }
        }
    }

}
</style>