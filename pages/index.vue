<template>
    <LocationsSlider v-if="locations.length && !loading" v-slot="{ SwiperSlide }" :disabled="editLayout" :slide-to="slideToLocation">
        <component :is="SwiperSlide" v-for="(loc, id) in locations" :key="loc.id">
            <LocationHeader :curent-location="id === 0" :name="loc.city" :id-location="loc.id" :available-blocks="locationsStructurees[loc.id].availableBlocks" />
            <TilesConstructor 
            :parent-id="loc.id"
            :pos-data="{
                pos: loc.pos,
                timezone: loc.timezone
            }"
             :structure="locationsStructurees[loc.id].structure" />
        </component>
    </LocationsSlider>
    <AppLoader v-else-if="loading" class="mx-auto  mt-32" />
    <div v-else class="mt-32 text-center">
        <h3 class="mb-8">
            Nothing there( Allow location access in browser or add location
        </h3>
        <AppButton size="lg" class="mx-auto" to="/?add-location">
            Add location
        </AppButton>
    </div>
</template>

<script lang="ts" setup>
// eslint-disable-next-line @conarti/feature-sliced/public-api
import { storeToRefs } from 'pinia';
import { LocationHeader } from '~/widgets/LocationHeader';
import { TilesConstructor } from '~/widgets/Tile';
import { LocationsSlider } from '~/entities/LocationsSlider';
import AppButton from '~/shared/ui/AppButton/AppButton.vue';
import AppLoader from '~/shared/ui/AppLoader/AppLoader.vue';

const mainStore = useMainStore();
const structureStore = useStructureStore();

const { editLayout, loading, locations, slideToLocation } = storeToRefs(mainStore);
const { locationsStructurees } = storeToRefs(structureStore);

</script>

<style lang="scss" scoped></style>