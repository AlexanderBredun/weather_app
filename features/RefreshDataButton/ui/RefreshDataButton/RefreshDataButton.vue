<template>
    <button title="Refresh data" aria-label="Refresh data" @click="refresh"
        class="w-auto h-auto text-base transition duration-300 group">
        <template v-if="$slots.default">
            <span class="underline"><slot ></slot></span>&nbsp;
        </template>
        
        <i class="fal fa-redo group-hover:rotate-90 transition duration-300" :class="`fa-${size}`"></i>
    </button>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { findPropertyById } from '~/shared/store/structureStore';

interface RefreshDataButtonProps{
	parentId?: string
	size?: 'sm' | 'lg' | 'xl'
}

const props = withDefaults(defineProps<RefreshDataButtonProps>(), {
	size: 'lg'
});

const nuxtApp = useNuxtApp();
const storeStructure = useStructureStore();

const { locationsStructurees } = storeToRefs(storeStructure);


const refresh = () => {

	if (props.parentId) {
		const item = findPropertyById(locationsStructurees.value, props.parentId);
		if(item){
			
			refreshNuxtData(item.structure.find(el => el.id === props.parentId)?.refresh);
		}
	}
	else {
		refreshNuxtData(Object.keys(nuxtApp.payload.data));
	}

};
</script>

<style></style>