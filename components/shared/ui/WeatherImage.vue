<template>
   <img class="pointer-events-none" loading="lazy" :src="`${WEATHER_CODES(status, time)?.img}.svg`" />
</template>

<script setup lang="ts">
import { WEATHER_CODES } from '@/utils/constants'

const props = defineProps({
    status: {
        type: Number,
        required: true
    },
    time: Number
})
</script>

<style>

</style>