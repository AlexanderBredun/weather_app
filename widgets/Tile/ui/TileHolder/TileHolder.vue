

<template>
    <div class="tile-holder bg-def-bg shadow-def-bg shadow-def border-blue-600 border flex flex-col justify-center  hover:bg-blue-700 transition-all duration-300 rounded-xl relative"
               :class="{ 'text-center p-12 flex items-center justify-center': loading }" >
        <AppLoader v-if="loading" />
        <div v-else-if="error" class="flex items-center justify-center w-full h-full">
            <p v-if="!noSettings">
                Something went wrong. Please <RefreshDataButton :parent-id="parentId">try again</RefreshDataButton>
            </p>
            <p v-else>
                Something went wrong. Please try again
            </p>
        </div>
        <template v-else>
            
            <TileSettings v-if="!noSettings" :parent-id="parentId" />
            <slot></slot>
        </template>

    </div>
</template>

<script setup lang="ts">
import { RefreshDataButton } from '~/features/RefreshDataButton';
import AppLoader from '~/shared/ui/AppLoader/AppLoader.vue';
import TileSettings from '../TileSettings/TileSettings.vue';


interface TileHolderProps{
    parentId: string
    noSettings?: boolean
    error?: boolean
    loading?: boolean
}

defineProps<TileHolderProps>();

</script>


<style scoped lang="scss">

.tile-holder {
    @include rwd(1000) {
        height: auto;
        min-height: 290px;
    }
    padding: 2.5rem 1rem 1rem;
    @include sm{
        padding: 3.5rem 2rem 2rem;
    }

}
</style>