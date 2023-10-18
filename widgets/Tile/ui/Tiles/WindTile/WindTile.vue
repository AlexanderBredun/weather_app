<template>
    <TileHolder tag="section" class=" tile" :parent-id="parentId" :loading="pending" :error="error">
        <TileResponsive v-if="data">
            <template #desktop>
                <div class="desc-container flex justify-center items-start [&>*]:w-1/2">
                    <ul class="divide-y divide-blue-400 w-max space-y-6 [&>li]:pt-6 ">
                        <li>
                            <p class="mb-4">
                                Wind speed: {{ data.windspeed }}&nbsp;km/h
                            </p>
                            <InfoDropdown :text="WINDSPEED(data.windspeed).text">
                                {{ WINDSPEED(data.windspeed).title }}
                            </InfoDropdown>
                        </li>
                        <li>
                            <p>
                                Wind direction: <span class="whitespace-nowrap">{{ getCardinalDirection(data.winddirection)
                                }}</span>
                            </p>
                        </li>

                    </ul>
                    <div class="relative  compass [&>h2]:absolute [&>h2]:m-0 " :class="compassClasses">
                        <h2 class=" top-0 left-1/2 -translate-x-1/2">
                            N
                        </h2>
                        <h2 class=" top-1/2 right-0 -translate-y-1/2">
                            E
                        </h2>
                        <h2 class=" bottom-0 left-1/2 -translate-x-1/2">
                            S
                        </h2>
                        <h2 class=" top-1/2 left-0 -translate-y-1/2">
                            W
                        </h2>
                        <nuxt-icon name="compassrose" class="img-compass" />
                        <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ">
                            <img class="block w-10/12 h-10/12 m-auto"
                                 :style="{ 'transform': `rotate(${data.winddirection}deg)` }" src="/compass_arrow.svg" alt="">
                        </div>

                    </div>
                </div>


            </template>

            <template #mobile>
                <div class="flex justify-center items-start [&>*]:w-1/2">
                    
                    <div class="relative  compass [&>h2]:absolute [&>h2]:m-0 " :class="compassClasses">
                        <h2 class=" top-0 left-1/2 -translate-x-1/2">
                            N
                        </h2>
                        <h2 class=" top-1/2 right-0 -translate-y-1/2">
                            E
                        </h2>
                        <h2 class=" bottom-0 left-1/2 -translate-x-1/2">
                            S
                        </h2>
                        <h2 class=" top-1/2 left-0 -translate-y-1/2">
                            W
                        </h2>
                        <nuxt-icon name="compassrose" class="img-compass" />
                        <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ">
                            <nuxt-icon name="compassrose" class="img-compass" />
                            <img class="block w-10/12 h-10/12 m-auto"
                                 :style="{ 'transform': `rotate(${data.winddirection}deg)` }" src="/compass_arrow.svg" alt="">
                        </div>

                    </div>
                </div>
            </template>

            <template #mobile-popup>

                <div class="">
                    <ul class="divide-y divide-blue-400 mx-auto mb-20 space-y-6 [&>li]:pt-6 ">
                        <li>
                            <p class="mb-4">
                                Wind speed: {{ data.windspeed }}&nbsp;km/h
                            </p>
                            <InfoDropdown :text="WINDSPEED(data.windspeed).text">
                                {{ WINDSPEED(data.windspeed).title }}
                            </InfoDropdown>
                        </li>
                        <li>
                            <p>
                                Wind direction: <span class="whitespace-nowrap">{{ getCardinalDirection(data.winddirection)
                                }}</span>
                            </p>
                        </li>

                    </ul>
                    <div class="relative  compass [&>h2]:absolute [&>h2]:m-0 " :class="compassClasses">
                        <h2 class=" top-0 left-1/2 -translate-x-1/2">
                            N
                        </h2>
                        <h2 class=" top-1/2 right-0 -translate-y-1/2">
                            E
                        </h2>
                        <h2 class=" bottom-0 left-1/2 -translate-x-1/2">
                            S
                        </h2>
                        <h2 class=" top-1/2 left-0 -translate-y-1/2">
                            W
                        </h2>
                        <nuxt-icon name="compassrose" class="img-compass" />
                        <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ">
                            <img class="block w-10/12 h-10/12 m-auto"
                                 :style="{ 'transform': `rotate(${data.winddirection}deg)` }" src="/compass_arrow.svg" alt="">
                        </div>

                    </div>
                </div>
            </template>
        </TileResponsive>
    </TileHolder>
</template>

<script setup lang="ts">
import { getWind } from '~/shared/api/weatherService';
import { iPos, tTilesSize } from '~/shared/lib/types';
import { WINDSPEED } from '~/shared/lib/utils';
import InfoDropdown from '~/shared/ui/InfoDropdown/InfoDropdown.vue';
import { useFetchTileData } from '../../../hooks/useFetchTileData';
import TileHolder from '../../TileHolder/TileHolder.vue';
import TileResponsive from '../../TileResponsive/TileResponsive.vue';

interface WindTileProps {
    parentId: string;
    tileSize: tTilesSize
    pos: iPos
    timezone?: string
}

const props = defineProps<WindTileProps>();

const { data, pending, error } = await useFetchTileData(props.parentId, () => getWind(props.pos));


const compassClasses = computed<string | null>(() => {
	const classes = {
		large: 'p-20',
		small: '[&>h2]:text-base p-12',
		medium: '[&>h2]:text-lg p-16',
	};

	return classes[props.tileSize];
});

const getCardinalDirection = (angle: number): string => {
	const directions = ['↑ N', '↗ NE', '→ E', '↘ SE', '↓ S', '↙ SW', '← W', '↖ NW'];
	return directions[Math.round(angle / 45) % 8];
};

</script>


<style lang="scss" scoped>
.small {
    .desc-container {
        &>* {
            width: 50%;

            &:first-child {
                width: 50%;
                margin: 0 2rem 0 0;
            }
        }

        ul {
            p {
                @apply text-sm;
            }
        }
    }
}

.compass {
    max-width: 300px;
    width: fit-content;
    margin: 0 auto;

    h2 {
        @include md {
            @apply text-lg;
        }
    }
}

.img-compass {

    aspect-ratio: 16/9;

    :deep(svg) {
        pointer-events: none;
        width: 100%;
        height: 100%;
        @apply text-def-bg;
    }
}</style>