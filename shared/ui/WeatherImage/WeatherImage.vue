<template>
    <img class="pointer-events-none" loading="lazy" :src="`${WEATHER_CODES(status, time).img}.svg`" />
 </template>
  
<script setup lang="ts">
import { tWeatherCodes } from '../../lib/types';
import { WEATHER_CODES } from '../../lib/utils';
 
interface WeatherImageProps{
    status: tWeatherCodes
    time?: number
}

defineProps<WeatherImageProps>();

</script>
 
 <style>
 
 </style>