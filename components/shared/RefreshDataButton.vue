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
import { useStructureStore, findPropertyById } from '@/store/structure'

const nuxtApp = useNuxtApp()
const props = defineProps({
    parentId: {
        type: String,
    },
    size: {
        type: String,
    }
})

const store = useStructureStore()
const { locationsStructurees } = storeToRefs(store);



const refresh = () => {

    if (props.parentId) {
        const item = findPropertyById(locationsStructurees.value, props.parentId);

        if(item){
            refreshNuxtData(item.structure.find((el) => el.id === props.parentId)?.refresh)
        }
    }
    else {
        refreshNuxtData(Object.keys(nuxtApp.payload.data))
    }

}
</script>

<style></style>