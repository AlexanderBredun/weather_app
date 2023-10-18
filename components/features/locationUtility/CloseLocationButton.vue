<template>
   <button title="Remove location" aria-label="Remove location" @click.prevent="removeLocation">
        <i class="fal fa-times-circle fa-2x text-red-700"></i>
    </button>
</template>


<script lang="ts" setup>
import { useMainStore } from '@/store/index'
 const props = defineProps({
        parentId: {
            type: String,
            required: true
        }
    })

    const store = useMainStore()

    const removeLocation = ()=> {
        if(confirm("Are you sure you want to remove location?")){
            store.removeLocation(props.parentId)
        }
       
    }
</script>

<style>

</style>