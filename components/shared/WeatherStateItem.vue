<template>
  <li class=" text-center flex flex-col" :class="size === 'small' ? 'w-28' : 'w-56'">
    <p>
      <slot name="date"></slot>
    </p>
    <WeatherImage class="max-w-xs w-full d-block self-center " :class="size === 'small' && 'max-h-28'"
      :status="item.status" :time="item.time" />


    <TextRain v-if="item.precipitationProbability > 30">
      {{ item.precipitationProbability }}&nbsp;%
    </TextRain>
    <p class="nowrap" :class="autoHeightLast && 'mt-auto'">
      <slot name="temperature"></slot>
    </p>
  </li>
</template>

<script setup lang="ts">

import WeatherImage from '@/components/shared/ui/WeatherImage.vue'
import TextRain from '@/components/shared/ui/TextRain.vue'
const props = defineProps({
  item: {
    type: Object,
    required: true,
  },
  autoHeightLast: Boolean,
  size: String
})

</script>

<style></style>