<template>
    <section class="">
        <Draggable v-if="structureResult?.length" class="flex flex-wrap tiles-holder" :list="structureResult"
                   @change="onChangeStructure" :disabled="noSettings || !editLayout">
            <component v-for="tile in structureResult" :no-settings="noSettings" :pos="posData?.pos"
                       :timezone="posData?.timezone"
                       :class="[tile.size, editLayout && `shake-${getRandomArbitrary(1, 6)} cursor-pointer`]" :key="tile.id"
                       :is="getTileComponent(tile.name)" :parent-id="tile.id" :tile-size="tile.size"></component>
        </Draggable>
        <div v-else>
            <h2 class="text-center">
                Nothing there
            </h2>
            <p class="text-center">
                Add blocks with informations
            </p>
            <AddMoreInfoDropdown v-if="parentId" class="mt-8 max-w-md mx-auto" :parent-id="parentId"
                                 :blocks="locationsStructurees[parentId].availableBlocks" />
        </div>

    </section>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { computed } from 'vue';
import { VueDraggableNext as Draggable } from 'vue-draggable-next';
import { AddMoreInfoDropdown } from '~/features/AddMoreInfoDropdown';
import { iPosWithTimezone, iStructureItem, tTilesNames } from '~/shared/lib/types';
import { addLocalStorage, eLocalStorageKeys, structureDefault } from '~/shared/lib/utils';

interface TilesConstructorProps {
    noSettings?: boolean
    parentId?: string
    posData: iPosWithTimezone
    structure?: iStructureItem[]
}

const props = defineProps<TilesConstructorProps>();

const tilesItems = import.meta.glob('../Tiles/**/*.vue');


const { locationsStructurees } = storeToRefs(useStructureStore());

const onChangeStructure = () => {
    addLocalStorage(eLocalStorageKeys.STRUCTURE, [locationsStructurees.value], true);
};

const getRandomArbitrary = (min: number, max: number): number => {
    return Math.floor(Math.random() * (max - min) + min);
};

const store = useMainStore();
const { editLayout } = storeToRefs(store);

const structureResult = computed(() => props.noSettings ? structureDefault() : props.structure);
const getTileComponentConstruct = () => {
    const cache: Record<tTilesNames, any | never> | Record<string, undefined> = {};
    return (name: tTilesNames) => {
        if (cache[name]) {
            return cache[name];
        }
        for (const path in tilesItems) {
            const componentName = path.split('/').at(-1)?.split('.')[0];
            if (componentName === name) {
                 
                const comp = defineAsyncComponent(() => import(`../Tiles/${name}/${name}.vue`))
                cache[name] = comp;
                return comp
            }
        }
    }
};
const getTileComponent = getTileComponentConstruct()
</script>

<style lang="scss" scoped>
.tiles-holder>* {
    margin: 10px;
}

.tiles-holder {
    margin: -10px;
}

.small {
    width: calc(50% - 20px);

    @media (min-width: 800px) {
        width: calc(33.333% - 20px);
    }
}

.medium {
    width: calc(50% - 20px)
}

.large {
    width: calc(100% - 20px)
}
</style>