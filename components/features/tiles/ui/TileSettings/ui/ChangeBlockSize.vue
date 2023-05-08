<template>
    <Dropdown title="Change size" aria-label="Change size" class="">
        <template #title>
            <i class="fas fa-sort-size-down-alt"></i>
        </template>
        <template #content>
            <p v-for="(item, id) in sizes" :key="id" :class="item" class="bg-violet-500 py-2 px-6 text-sm transition-all capitalize hover:bg-violet-400">
                <a href="" role="button" @click.prevent="setCurentSize(item)">
                    {{ item }}
                </a>
            </p>   
        </template>
    </Dropdown>
   
</template>

<script setup lang="ts">
import { useStructureStore } from '@/store/structure'
import Dropdown from '@/components/shared/ui/Dropdown.vue'

    const props = defineProps({
        parentId: {
            type: String,
            required: true
        }
    })

    const sizes: Array<string> = [ 'small', 'medium', 'large' ]

    const store = useStructureStore()
    const { setTileSize } = store;

    const setCurentSize = (size: string)=> {
        setTileSize(props.parentId, size)
    }

   

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