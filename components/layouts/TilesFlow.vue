<template>
    <section class="">
        
        <draggable v-if="structureResult?.length" class="flex flex-wrap tiles-holder" :list="structureResult" @change="log" :disabled="defaultView || !editLayout">
            <component v-for="tile in structureResult" :no-settings="defaultView" :pos="posData?.pos" :timezone="posData?.timezone"
                :class="[tile.size, editLayout && `shake-${getRandomArbitrary(1,6)} cursor-pointer` ]" :key="tile.id" :is="setComponentName(tile.name)" :tile-id="tile.id"
                :tile-size="tile.size"></component>
        </draggable>
        <div v-else >
            <h2 class="text-center">
                Nothing there
            </h2>
            <p class="text-center">
                Add blocks with informations
            </p>
        </div>

    </section>
</template>

<script setup lang="ts">
import MainInfoTile from '@/components/features/tiles/MainInfoTile.vue'
import HourlyWeatherTile from '@/components/features/tiles/HourlyWeatherTile.vue'
import DailyWeatherTile from '@/components/features/tiles/DailyWeatherTile.vue'
import SunriseTile from '@/components/features/tiles/SunriseTile/index.vue'
import WindTile from '@/components/features/tiles/WindTile.vue'
import { computed } from "vue"
import { storeToRefs } from 'pinia'
import { structureDefault } from '@/utils/constants'
import { useMainStore } from '@/store/index'
import { useStructureStore } from '@/store/structure'

const props = defineProps({
    defaultView: Boolean,
    posData: Object,
    structure: Array<IStructureItem>,

})
interface IStructureItem{
    id: string
    name: string
    displayName: string
    size: string
}

const storeStructure = useStructureStore()
    const { addStructureToLocalStore } = storeStructure;

const log = ()=> {
    addStructureToLocalStore()
}

const getRandomArbitrary = (min: number, max: number): number => {
    return Math.floor(Math.random() * (max - min) + min);
}

const store = useMainStore()
const { editLayout } = storeToRefs(store)


const structureResult = computed(() => props.defaultView ? structureDefault() : props.structure);



const setComponentName = (name: string) => {
    switch (name) {
        case 'MainInfoTile':
            return MainInfoTile;
        case 'HourlyWeatherTile':
            return HourlyWeatherTile;
        case 'DailyWeatherTile':
            return DailyWeatherTile;
        case 'SunriseTile':
            return SunriseTile;
        case 'WindTile':
            return WindTile;
    }
}

</script>

<style lang="scss" scoped>
.tiles-holder>* {
    margin: 10px;
}

.tiles-holder {
    margin: -10px;
}
.small{
    width: calc(50% - 20px);
    @media (min-width: 800px){
        width: calc(33.333% - 20px);
    }
}
.medium{
    width: calc(50% - 20px)
}
.large{
    width: calc(100% - 20px)
}
</style>