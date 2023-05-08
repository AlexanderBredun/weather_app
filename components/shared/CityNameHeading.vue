<template>
   <h2 >
        {{ name }} <RefreshDataButton v-if="!noRefresh" size="sm"/>
    </h2>
</template>

<script setup lang="ts">

    import RefreshDataButton from '@/components/shared/RefreshDataButton'
    
    const props = defineProps({
        noRefresh: Boolean,
        pos: Object,
        name: String
    })

   
</script>
