<template>
    <Tile tag="section" class="py-12 px-5 tile lg:p-12" :tileId="tileId" :loading="pending" :error="error">
        <TileResponsive mobile-classes="mt-0" mobile-popup-classes="pt-0">
            <template #desktop>
                <h3>
                    Weather for 7 days
                </h3>
                <ScrollList class="list-weather">
                    <WeatherStateItem v-for="(item, i) in weatherDaily" :item="item" :key="i" auto-height-last>
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
                    <WeatherStateItem v-for="(item, i) in weatherDaily" :item="item" :key="i" auto-height-last>
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
                    <li v-for="(item, i) in weatherDaily" :key="i" class="flex justify-between items-center h-40">
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

    </Tile>
</template>

<script setup lang="ts">
import Tile from '~/components/layouts/Tile.vue'
import ScrollList from '@/components/shared/ScrollList.vue'
import WeatherStateItem from '@/components/shared/WeatherStateItem.vue'
import TileResponsive from '@/components/layouts/TileResponsive.vue'
import WeatherImage from '@/components/shared/ui/WeatherImage.vue'
import PrecipitationText from '@/components/shared/PrecipitationText.vue'
import { 
    IDailyInfoTransformed,
 } from '@/types/transormedData'
import { IPos } from '~/types/IPos'

const props = defineProps({
    tileId: {
        type: String,
        required: true
    },
    pos: Object as PropType<IPos>,
    timezone: String,

})


const dateFormated = (date: string | number | Date): string => {
    return new Date(date).toLocaleDateString('en-EN', { weekday: 'long' })
}




const { data: weatherDaily, pending, refresh, error }:{data: Array<IDailyInfoTransformed>, pending: globalThis.Ref<boolean>, refresh: Promise<void>, error: any} = await useLazyDelayedData(props.tileId, 'getDailyInfo', 'dailyInfoFormatter', props.pos, props.timezone)


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