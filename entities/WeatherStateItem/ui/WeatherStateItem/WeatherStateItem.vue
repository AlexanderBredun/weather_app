<template>
  <component :is="listChild ? 'li' : 'div'" class=" text-center flex flex-col" :class="size === 'small' ? 'w-28' : 'w-56'">
    <p>
      <slot name="date"></slot>
    </p>
    
    <WeatherImage class="max-w-xs w-full d-block self-center " :class="size === 'small' && 'max-h-28'"
                  :status="image.status" :time="image.time" />


    <TextRain v-if="precipitation > 10">
      {{ precipitation }}&nbsp;%
    </TextRain>
    <p class="nowrap" :class="autoHeightLast && 'mt-auto'">
      <slot name="temperature"></slot>
    </p>
  </component>
</template>
  
<script setup lang="ts">
import { tWeatherCodes } from '~/shared/lib/types';
import TextRain from '~/shared/ui/TextRain/TextRain.vue';
import WeatherImage from '~/shared/ui/WeatherImage/WeatherImage.vue';

interface WeatherStateItemProps {
  listChild?: boolean;
  image: {
    status: tWeatherCodes,
    time?: number
  }
  precipitation: number
  autoHeightLast?: boolean
  size?: 'small'
}

defineProps<WeatherStateItemProps>();


</script>
  
<style></style>