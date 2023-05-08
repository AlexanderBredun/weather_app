<script setup lang="ts">

import { computed } from 'vue'
import Tile from '~/components/layouts/Tile.vue'
import TileResponsive from '@/components/layouts/TileResponsive.vue'
import { WINDSPEED } from '@/utils/constants'
import InfoDropdown from '@/components/shared/InfoDropdown.vue'
import type { PropType } from 'vue'
import { IPos } from '~/types/IPos'


const props = defineProps({
    tileId: {
        type: String,
        required: true
    },
    tileSize: {
        type: String as PropType<"large" | "small" | "medium">,
        required: true
    },
    pos: Object as PropType<IPos>,
    timezone: String,
})

const { data: weather, pending, refresh, error } = await useLazyDelayedData(props.tileId, 'getWind', false, props.pos, props.timezone);

const compassClasses = computed(():string | null => {
    const classes = {
        large: 'p-20',
        small: '[&>h2]:text-base p-12',
        medium: '[&>h2]:text-lg p-16',
    }
 
    return classes[props.tileSize]
})

const getCardinalDirection = (angle: number):string => {
    const directions = ['↑ N', '↗ NE', '→ E', '↘ SE', '↓ S', '↙ SW', '← W', '↖ NW'];
    return directions[Math.round(angle / 45) % 8];
}

</script>

<template>
    <Tile tag="section" class=" py-14 px-12 tile" :tileId="tileId" :loading="pending" :error="error" >
        <TileResponsive desktop-classes="">
            <template #desktop>
                <div class="desc-container flex justify-center items-start [&>*]:w-1/2">
                    <ul class="divide-y divide-blue-400 w-max space-y-6 [&>li]:pt-6">
                   <li>
                        <p>
                            Wind speed: {{ weather.current_weather.windspeed }}&nbsp;km/h
                        </p>
                        <InfoDropdown :text="WINDSPEED(weather.current_weather.windspeed).text">
                                    {{ WINDSPEED(weather.current_weather.windspeed).title }}
                                </InfoDropdown>
                   </li> 
                   <li>
                        <p>
                            Wind direction: <span class="whitespace-nowrap">{{ getCardinalDirection(weather.current_weather.winddirection) }}</span>
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
                        <img class="block w-10/12 h-10/12 m-auto" :style="{'transform': `rotate(${weather.current_weather.winddirection}deg)`}" src="compass_arrow.svg" alt="">
                    </div>
                   
                </div>
                </div>
                
                
               

            </template>

            <template #mobile>
                
            </template>

            <template #mobile-popup>
               
                
            </template>
        </TileResponsive>
    </Tile>
</template>



<style lang="scss" scoped>
@import "assets/styles/variables";

.small{
    .desc-container{
        & > *{
            width: 50%;
            &:first-child{
                width: 50%;
                margin: 0 2rem 0 0;
            }
        }
        ul{
            p{
                @apply text-sm;
            }
        }
    }
}
.compass{
    max-width: 300px;
    width: fit-content;
    margin: 0 auto;

    h2{
        @include md{
    @apply text-lg;
  }
    }
}
.img-compass{
  
  aspect-ratio: 16/9;
  :deep(svg){
    pointer-events: none;
    width: 100%;
    height: 100%;
    @apply text-def-bg;
  }
}
</style>