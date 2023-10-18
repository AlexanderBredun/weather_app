<template>
    <AppDropdown title="Change size" aria-label="Change size" class="">
        <template #title>
            <i class="fas fa-sort-size-down-alt"></i>
        </template>
        <template #content>
            <p v-for="(item, id) in sizes" :key="id" :class="item" class="bg-violet-500  text-sm transition-all capitalize hover:bg-violet-400">
                <a href="" tabindex="0" role="button" class="py-2 px-6 w-full block" @click.prevent="setCurentSize(item)">
                    {{ item }}
                </a>
            </p>   
        </template>
    </AppDropdown>
   
</template>

<script setup lang="ts">
import { tTilesSize } from '~/shared/lib/types';
import { eTilesSize } from '~/shared/lib/utils/consts';
import AppButton from '~/shared/ui/AppButton/AppButton.vue';
import AppDropdown from '~/shared/ui/AppDropdown/AppDropdown.vue';

interface ChangeTileSizeButtonProps{
    parentId: string;
}

const props = defineProps<ChangeTileSizeButtonProps>();

const sizes = Object.values(eTilesSize);

const store = useStructureStore();
const { setTileSize } = store;

const setCurentSize = (size: tTilesSize)=> {
	setTileSize(props.parentId, size);
};
   

</script>

<style lang="scss" scoped>
  
    .small{
        @media (max-width: 800px){
            display: none;
        }
    }
    .medium{
        @media (max-width: 800px){
            border: none;
        }
    }
</style>