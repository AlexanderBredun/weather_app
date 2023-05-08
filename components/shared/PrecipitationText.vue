<template>
   
    <text-rain v-if="rain">{{ power(rain) }} rain</text-rain>
    <text-rain v-else-if="snow">{{ power(snow) }} snowfall</text-rain>
</template>

<script setup lang="ts">
    import TextRain from '@/components/shared/ui/TextRain.vue' 

    const props = defineProps({
        rain: {
            type: Number,
            required: true,
        },
        snow: {
            type: Number,
        },
    })

    const power = (val: number): string => {
       if(val <= 5){
            return 'Light'
       }
       else if(val > 5 && val <= 15){
        return 'Moderate'
       }
       return 'Heavy'
    }

</script>

<style>

</style>