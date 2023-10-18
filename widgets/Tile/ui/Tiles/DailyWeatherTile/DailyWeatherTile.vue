<template>
    <TileHolder tag="section" class="tile" :parent-id="parentId" :loading="pending" :error="error">
        <TileResponsive v-if="data" mobile-classes="mt-0" mobile-popup-classes="pt-0">
            <template #desktop>
                <h3>
                    Weather for 7 days
                </h3>
                <ScrollList class="list-weather">
                    <WeatherStateItem v-for="(item, i) in data"
                     :key="i" auto-height-last :image="{status: item.status}" :precipitation="item.precipitationProbability">
                        <template #date>
                            {{ i === 0 ? 'Today' : dateFormated(item.date) }}
                        </template>
                        <template #temperature>
                            {{ item.temperatureMin }}°C &mdash; {{ item.temperatureMax }}°C
                        </template>
                    </WeatherStateItem>
                </ScrollList>
            </template>

            <template #mobile>
                <h3 class="text-center">
                    Weather for 7 days
                </h3>
                <ScrollList class="list-weather">
                    <WeatherStateItem v-for="(item, i) in data"
                     :item="item" :key="i" auto-height-last :image="{status: item.status}" :precipitation="item.precipitationProbability">
                        <template #date>
                            {{ i === 0 ? 'Today' : dateFormated(item.date) }}
                        </template>
                        <template #temperature>
                            {{ item.temperatureMin }}°C &mdash; {{ item.temperatureMax }}°C
                        </template>
                    </WeatherStateItem>
                </ScrollList>
            </template>

            <template #mobile-popup>
                <h3 class="sticky top-0 backdrop-blur-sm bg-blue-500/50 m-0 pb-4 pt-12">
                    Weather for 7 days
                </h3>
                <ul class="divide-y divide-blue-400">
                    <li v-for="(item, i) in data" :key="i" class="flex justify-between items-center h-40">
                        <p class="mr-4 w-24">
                            {{ i === 0 ? 'Today' : dateFormated(item.date).slice(0, 3) }}
                        </p>
                        <div class="w-24">
                            <WeatherImage class=" w-full d-block self-center max-h-20 d-block lg:max-w-xs"
                                          :status="item.status" :time="12" />
                            <PrecipitationText :rain="item.rain" :snow="item.snow" />
                        </div>

                        <p class="">
                            {{ item.temperatureMin }}°C &mdash; {{ item.temperatureMax }}°C
                        </p>
                    </li>
                </ul>

            </template>
        </TileResponsive>

    </TileHolder>
</template>

<script setup lang="ts">
import { PrecipitationText } from '~/entities/PrecipitationText';
import { WeatherStateItem } from '~/entities/WeatherStateItem';
import { getDailyInfo } from '~/shared/api/weatherService';
import { iPos } from '~/shared/lib/types';
import ScrollList from '~/shared/ui/ScrollList/ScrollList.vue';
import WeatherImage from '~/shared/ui/WeatherImage/WeatherImage.vue';
import { useFetchTileData } from '../../../hooks/useFetchTileData';
import TileHolder from '../../TileHolder/TileHolder.vue';
import TileResponsive from '../../TileResponsive/TileResponsive.vue';

interface DailyWeatherTileProps {
    parentId: string;
    pos: iPos
    timezone?: string
}

const props = defineProps<DailyWeatherTileProps>();


const dateFormated = (date: string | number): string => {
	return new Date(date).toLocaleDateString('en-EN', { weekday: 'long' });
};

const { data, pending, error } = await useFetchTileData(props.parentId, ()=> getDailyInfo(props.pos, props.timezone));


</script>

<style lang="scss" scoped>
.tile {
    &.large .list-weather:deep(li) {
        @apply w-56;
    }

    &.small {
        .list-weather:deep(li) {
            @apply w-28;

            p {
                font-size: 9px;
            }

            iframe {
                @apply max-h-28;
            }

        }
    }

    &.medium {
        .list-weather:deep(li) {
            @apply w-40;

            p {
                font-size: 12px;
            }

            iframe {
                @apply max-h-28;
            }

        }
    }

}
</style>