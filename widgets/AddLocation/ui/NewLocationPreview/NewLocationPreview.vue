<template>
    <div v-if="activeLocation">
        <div class="flex justify-between items-center mb-6">
            <h2 class="m-0">
                {{ activeLocation.name }}, {{ activeLocation.country }}
            </h2>
            <AppButton v-if="isAlreadyInList(activeLocation.lat, activeLocation.long)" @click.prevent="addLocation">
                Add location
            </AppButton>
        </div>

        <TilesConstructor :key="activeLocation.id" no-settings :pos-data="{
            pos: {
                lat: activeLocation.lat,
                long: activeLocation.long
            },
            timezone: activeLocation.timezone
        }" />
    </div>
</template>

<script lang="ts" setup>
import { storeToRefs } from 'pinia';
// eslint-disable-next-line @conarti/feature-sliced/layers-slices
import { TilesConstructor } from '~/widgets/Tile';
import AppButton from '~/shared/ui/AppButton/AppButton.vue';
import { useAddLocationStore } from '../../store/useAddLocationStore';

const addLocStore = useAddLocationStore();
const { activeLocation } = storeToRefs(addLocStore);

const router = useRouter();

const storeMain = useMainStore();
const { addPositionActive } = storeMain;
const { locations } = storeToRefs(storeMain);

const isAlreadyInList = (lat: number, long: number): boolean => {
	if (locations.value.length < 2) return true;
	return locations.value.slice(1).some(el => el.pos.lat !== lat && el.pos.long !== long);
};

const addLocation = () => {
	addPositionActive({
		lat: activeLocation.value!.lat,
		long: activeLocation.value!.long,
	})
		.then(()=> {
			addLocStore.$reset();
			router.push({ path: '/' });
			storeMain.slideToLocation = locations.value.length + 1;
		});
	
};
</script>

<style lang="scss" scoped></style>