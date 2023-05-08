<template>
   <button title="Close tab" aria-label="Close tab" @click.prevent="closeTab">
        <i class="fal fa-times-circle"></i>
    </button>
</template>


<script lang="ts" setup>
import { useStructureStore } from '@/store/structure'
 const props = defineProps({
        parentId: {
            type: String,
            required: true
        }
    })

    const store = useStructureStore()
    const { removeTile } = store;

    const closeTab = ()=> {
        removeTile(props.parentId)
    }
</script>

<style>

</style>