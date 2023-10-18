<template>
    <TileHolder class="tile" :parent-id="parentId" :loading="pending" :error="Boolean(error)">
        <TileResponsive v-if="data" desktop-classes="flex justify-center" mobile-classes="px-5 flex flex-col">
            <template #desktop>
                <div class="mr-5 self-center image-block w-1/3">
                    <WeatherImage class="max-w-xs w-full d-block self-center d-block lg:max-w-xs " :status="data.status"
                                  :time="data.time" />

                    <TextRain v-if="data.precipitationProbability > 30">
                        {{ data.precipitationProbability }}&nbsp;%
                    </TextRain>
                </div>

                <div class="grow self-center aside-block">
                    <h3>
                        {{ WEATHER_CODES(data.status).text }}
                    </h3>
                    <ul class="space-y-2">
                        <MainInfoTileItemInfo title="Current temperature">
                            {{ data.temperature }}°C
                        </MainInfoTileItemInfo>
                        <MainInfoTileItemInfo title="Highest today">
                            {{ data.maxToday }}°C
                        </MainInfoTileItemInfo>
                        <MainInfoTileItemInfo title="Lowest today">
                            {{ data.minToday }}°C
                        </MainInfoTileItemInfo>
                        <MainInfoTileItemInfo title="Wind speed">
                            <p>{{ data.windspeed }} km/h </p>
                            <InfoDropdown :text="WINDSPEED(data.windspeed).text">
                                {{ WINDSPEED(data.windspeed).title }}
                            </InfoDropdown>
                        </MainInfoTileItemInfo>
                        <MainInfoTileItemInfo title="Feels like">
                            {{ data.feelsLikeTemperature }}°C
                        </MainInfoTileItemInfo>
                    </ul>
                </div>
            </template>

            <template #mobile>
                <div class="mb-5 self-center image-block">
                    <WeatherImage class="max-w-xs mx-auto w-full d-block self-center max-h-28 d-block lg:max-w-xs"
                                  :status="data.status" :time="data.time" />
                    <TextRain v-if="data.precipitationProbability > 30">
                        {{ data.precipitationProbability }}&nbsp;%
                    </TextRain>
                </div>

                <div class="grow self-center text-center aside-block">
                    <h3 class="text-base">
                        {{ WEATHER_CODES(data.status).text }}
                    </h3>
                    <h3 class="text-center">
                        {{ data.temperature }}°C
                    </h3>
                </div>
            </template>

            <template #mobile-popup>
                <div class="">
                    <div class="mb-5 self-center image-block">
                        <WeatherImage class="max-w-sm mx-auto w-full d-block self-center max-h-48 d-block lg:max-w-xs"
                                      :status="data.status" :time="data.time" />
                        <TextRain v-if="data.precipitationProbability > 30">
                            {{ data.precipitationProbability }}&nbsp;%
                        </TextRain>
                    </div>

                    <div class="px-5  self-center aside-block">
                        <h3>
                            {{ WEATHER_CODES(data.status).text }}
                        </h3>
                        <ul class="space-y-2">
                            <MainInfoTileItemInfo mobile title="Current temperature">
                                {{ data.temperature }}°C
                            </MainInfoTileItemInfo>
                            <MainInfoTileItemInfo mobile title="Highest today">
                                {{ data.maxToday }}°C
                            </MainInfoTileItemInfo>
                            <MainInfoTileItemInfo mobile title="Lowest today">
                                {{ data.minToday }}°C
                            </MainInfoTileItemInfo>
                            <MainInfoTileItemInfo title="Wind speed">
                                <p class="text-right">{{ data.windspeed }} km/h </p>
                                <InfoDropdown class="justify-end" :text="WINDSPEED(data.windspeed).text">
                                    {{ WINDSPEED(data.windspeed).title }}
                                </InfoDropdown>
                            </MainInfoTileItemInfo>
                            <MainInfoTileItemInfo mobile title="Feels like">
                                {{ data.feelsLikeTemperature }}°C
                            </MainInfoTileItemInfo>
                        </ul>
                    </div>
                </div>
            </template>
        </TileResponsive>
    </TileHolder>
</template>

<script setup lang="ts">
import { getMainInfo } from '~/shared/api/weatherService';
import { iPos } from '~/shared/lib/types';
import { WEATHER_CODES, WINDSPEED } from '~/shared/lib/utils';
import InfoDropdown from '~/shared/ui/InfoDropdown/InfoDropdown.vue';
import TextRain from '~/shared/ui/TextRain/TextRain.vue';
import WeatherImage from '~/shared/ui/WeatherImage/WeatherImage.vue';
import { useFetchTileData } from '../../../hooks/useFetchTileData';
import TileHolder from '../../TileHolder/TileHolder.vue';
import TileResponsive from '../../TileResponsive/TileResponsive.vue';
import MainInfoTileItemInfo from './ui/MainInfoTileItemInfo.vue';

interface MainInfoTileProps{
    parentId: string;
    pos: iPos
    timezone?: string
}

const props = defineProps<MainInfoTileProps>();


const { data, pending, error } = await useFetchTileData(props.parentId, ()=> getMainInfo(props.pos, props.timezone));


</script>


<style lang="scss" scoped>
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