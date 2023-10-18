<template>
    <TileHolder tag="section" class="tile" :loading="pending" :error="error" :parent-id="parentId">
        <TileResponsive v-if="data">
            <template #desktop>
                <div class="flex mb-12">
                    <i class="fal fa-sunset fa-lg"></i>
                    <p class=" m-0 ml-4">
                        Sunset
                    </p>
                </div>
                <h2 class="">
                    {{ clock }}
                </h2>
                <div v-if="tileSize === 'large'" class="sun-graph-holder flex justify-between items-end">
                    <div class="sunrise-block text-center">
                        <i class="fal fa-sunrise"></i>
                        <p>Sunrise:<br> {{ getTime(data.sunrise) }}</p>
                    </div>
                    <SunriseGraphic class="mx-8" :trigger-reload="tileSize" :sunrise="data.sunrise" :sunset="data.sunset"
                                    :time-now="data.timeNow" />
                    <div class="sunset-block text-center">
                        <i class="fal fa-sunset"></i>
                        <p>Sunset:<br> {{ getTime(data.sunset) }}</p>
                    </div>
                </div>
                <div v-else class="sun-graph-holder ">
                    <SunriseGraphic class="mb-4" :trigger-reload="tileSize" :sunrise="data.sunrise" :sunset="data.sunset"
                                    :time-now="data.timeNow" />

                    <div class="flex justify-between items-end">
                        <div class="sunrise-block text-center">
                            <i class="fal fa-sunrise"></i>
                            <p>Sunrise:<br> {{ getTime(data.sunrise) }}</p>
                        </div>

                        <div class="sunset-block text-center">
                            <i class="fal fa-sunset"></i>
                            <p>Sunset:<br> {{ getTime(data.sunset) }}</p>
                        </div>
                    </div>

                </div>


            </template>

            <template #mobile>

                <div class="flex mb-12 justify-center sm:justify-start">
                    <i class="fal fa-sunset fa-lg"></i>
                    <p class=" m-0 ml-4">
                        Sunset
                    </p>
                </div>
                <h2 class="text-center">
                    {{ clock }}
                </h2>

                <div class="sun-graph-holder ">
                    <div class="flex justify-between items-end mr-4">
                        <div class="sunrise-block text-center">
                            <i class="fal fa-sunrise"></i>
                            <p>{{ getTime(data.sunrise) }}</p>
                        </div>

                        <div class="sunset-block text-center">
                            <i class="fal fa-sunset"></i>
                            <p>{{ getTime(data.sunset) }}</p>
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
                    {{ clock }}
                </h2>
                <SunriseGraphic class="mb-12" :trigger-reload="tileSize" :sunrise="data.sunrise" :sunset="data.sunset"
                                :time-now="data.timeNow" />
                <ul class="divide-y divide-blue-400">
                    <li class="flex justify-between items-center h-40">
                        <p>
                            <i class="fal fa-sunrise"></i>
                            <span>
                                Sunrise:
                            </span>
                        </p>
                        <p>
                            {{ getTime(data.sunrise) }}
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
                            {{ getTime(data.sunset) }}
                        </p>
                    </li>
                    <li v-if="getTotalDayTime" class="flex justify-between items-center h-40">
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
    </TileHolder>
</template>

<script setup lang="ts">
import { getSunriseSunset } from '~/shared/api/weatherService';
import { iPos, tTilesSize } from '~/shared/lib/types';
import { useFetchTileData } from '../../../hooks/useFetchTileData';
import TileHolder from '../../TileHolder/TileHolder.vue';
import TileResponsive from '../../TileResponsive/TileResponsive.vue';
import SunriseGraphic from './ui/SunriseGraphic/SunriseGraphic.vue';

interface SunriseTileProps {
    parentId: string;
    tileSize: tTilesSize
    pos: iPos
    timezone?: string
}

const props = defineProps<SunriseTileProps>();
const clock = ref<string>('');
const clockInterval = ref<ReturnType<typeof setInterval> | null>(null);

const { data, pending, error } = await useFetchTileData(props.parentId, () => getSunriseSunset(props.pos, props.timezone));


const getTime = (date: string | Date): string => {
	const hours = new Date(date).getHours().toString();
	const minutes = new Date(date).getMinutes().toString();
	return `${hours.length < 2 ? '0' + hours : hours}:${minutes.length < 2 ? '0' + minutes : minutes}`;
};

const intervalTimeCurrent = () => {
	const formatter = new Intl.DateTimeFormat([], {
		timeZone: props.timezone,
		hour: 'numeric',
		minute: 'numeric',
		second: 'numeric',
	});
	clock.value = formatter.format(new Date());
	clockInterval.value = setInterval(()=> {
		clock.value = formatter.format(new Date());
	}, 1000);
};

onMounted(()=> {
	intervalTimeCurrent();
});
onBeforeUnmount(()=> {
	if(clockInterval.value){
		clearInterval(clockInterval.value);
	}
});

const getTotalDayTime = computed((): string | null => {
	if (!data.value) {
		return null;
	}
	const sunrise = new Date(data.value.sunrise);
	const sunset = new Date(data.value.sunset);
	const res = sunset.getTime() - sunrise.getTime();
	const hours = Math.ceil(res / (1000 * 60 * 60)).toString();
	const minutes = Math.ceil((res / (1000 * 60)) % 60).toString();

	return `${hours.length < 2 ? '0' + hours : hours}:${minutes.length < 2 ? '0' + minutes : minutes}`;
});

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