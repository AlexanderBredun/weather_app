<script setup lang="ts">
import TextRain from '@/components/shared/ui/TextRain.vue'
import Tile from '~/components/layouts/Tile.vue'
import TileResponsive from '@/components/layouts/TileResponsive.vue'
import InfoDropdown from '@/components/shared/InfoDropdown.vue'

import WeatherImage from '@/components/shared/ui/WeatherImage.vue'
import { 
    IMainInfoTransformed,
 } from '@/types/transormedData'
import { PropType } from 'nuxt/dist/app/compat/capi'
import { IPos } from '~/types/IPos'

const props = defineProps({
    tileId: {
        type: String,
        required: true
    },
    pos: Object as PropType<IPos>,
    timezone: String,
})

const { data: weather, pending, refresh, error }:{data: IMainInfoTransformed, pending: globalThis.Ref<boolean>, refresh: Promise<void>, error: any } = await useLazyDelayedData(props.tileId, 'getMainInfo', 'mainInfoFormatter', props.pos, props.timezone)



</script>

<template>
    <Tile tag="section" class=" tile" :tileId="tileId" :loading="pending" :error="error">
        <TileResponsive desktop-classes="flex justify-center" mobile-classes="py-12 px-5">
            <template #desktop>
                <div class="mr-5 self-center image-block w-1/3">
                    <WeatherImage class="max-w-xs w-full d-block self-center d-block lg:max-w-xs" :status="weather.status"
                        :time="weather.time" />

                    <TextRain v-if="weather.precipitationProbability > 30">
                        {{ weather.precipitationProbability }}&nbsp;%
                    </TextRain>
                </div>

                <div class="grow px-5 py-12 self-center aside-block">
                    <h3>
                        {{ WEATHER_CODES(weather.status)?.text }}
                    </h3>
                    <ul class="space-y-2">
                        <li class="flex justify-start ">
                            <p class="w-1/2 mr-5 text-sm">
                                Current temperature
                            </p>
                            <p class="w-1/2 text-sm">
                                {{ weather.temperature }}°C
                            </p>
                        </li>
                        <li class="flex justify-start ">
                            <p class="w-1/2 mr-5 text-sm">
                                Highest today
                            </p>
                            <p class="w-1/2 text-sm">
                                {{ weather.maxToday }}°C
                            </p>
                        </li>
                        <li class="flex justify-start ">
                            <p class="w-1/2 mr-5 text-sm">
                                Lowest today
                            </p>
                            <p class="w-1/2 text-sm">
                                {{ weather.minToday }}°C
                            </p>
                        </li>
                        <li class="flex justify-start ">
                            <p class="w-1/2 mr-5 text-sm">
                                Wind speed
                            </p>
                            <div class="w-1/2 text-sm">
                                <p>{{ weather.windspeed }} km/h </p>
                                <InfoDropdown :text="WINDSPEED(weather.windspeed).text">
                                    {{ WINDSPEED(weather.windspeed).title }}
                                </InfoDropdown>
                            </div>
                        </li>
                        <li class="flex justify-start">
                            <p class="w-1/2 mr-5 text-sm">
                                Feels like
                            </p>
                            <p class="w-1/2 text-sm">
                                {{ weather.feelsLikeTemperature }}°C
                            </p>
                        </li>
                    </ul>
                </div>
            </template>

            <template #mobile>
                <div class="mb-5  self-center image-block">
                    <WeatherImage class="max-w-xs mx-auto w-full d-block self-center max-h-28 d-block lg:max-w-xs"
                        :status="weather.status" :time="weather.time" />
                    <TextRain v-if="weather.precipitationProbability > 30">
                        {{ weather.precipitationProbability }}&nbsp;%
                    </TextRain>
                </div>

                <div class="grow self-center text-center aside-block">
                    <h3 class="text-base">
                        {{ WEATHER_CODES(weather.status)?.text }}
                    </h3>
                    <h3 class="text-center">
                        {{ weather.temperature }}°C
                    </h3>
                </div>
            </template>

            <template #mobile-popup>
                <div class="">
                    <div class="mb-5 self-center image-block">
                        <WeatherImage class="max-w-sm mx-auto w-full d-block self-center max-h-48 d-block lg:max-w-xs"
                            :status="weather.status" :time="weather.time" />
                        <TextRain v-if="weather.precipitationProbability > 30">
                            {{ weather.precipitationProbability }}&nbsp;%
                        </TextRain>
                    </div>

                    <div class="px-5  self-center aside-block">
                        <h3>
                            {{ WEATHER_CODES(weather.status)?.text }}
                        </h3>
                        <ul class="space-y-2">
                            <li class="flex justify-start ">
                                <p class="w-1/2 mr-5 text-sm">
                                    Current temperature
                                </p>
                                <p class="w-1/2 text-sm text-right">
                                    {{ weather.temperature }}°C
                                </p>
                            </li>
                            <li class="flex justify-start ">
                                <p class="w-1/2 mr-5 text-sm">
                                    Highest today
                                </p>
                                <p class="w-1/2 text-sm text-right">
                                    {{ weather.maxToday }}°C
                                </p>
                            </li>
                            <li class="flex justify-start ">
                                <p class="w-1/2 mr-5 text-sm">
                                    Lowest today
                                </p>
                                <p class="w-1/2 text-sm text-right">
                                    {{ weather.minToday }}°C
                                </p>
                            </li>
                            <li class="flex justify-start ">
                                <p class="w-1/2 mr-5 text-sm">
                                    Wind speed
                                </p>
                                <div class="w-1/2 text-sm ">
                                    <p class="text-right">{{ weather.windspeed }} km/h </p>
                                    <InfoDropdown class="justify-end" :text="WINDSPEED(weather.windspeed).text">
                                        {{ WINDSPEED(weather.windspeed).title }}
                                    </InfoDropdown>
                                </div>
                            </li>
                            <li class="flex justify-start">
                                <p class="w-1/2 mr-5 text-sm">
                                    Feels like
                                </p>
                                <p class="w-1/2 text-sm text-right">
                                    {{ weather.feelsLikeTemperature }}°C
                                </p>
                            </li>
                        </ul>
                    </div>
                </div>
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