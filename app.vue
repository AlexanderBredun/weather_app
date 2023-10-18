<template>
  <div>
    <NuxtLayout>
    <NuxtLoadingIndicator />
    <NuxtPage />
  </NuxtLayout>
  </div>

</template>

<script setup lang="ts">
import { useMainStore } from './store/index'

const store = useMainStore()

const { addPositionActive } = store;

addPositionActive()




</script>

<style lang="scss">

  @import "assets/styles/main";
  html {
    font-size: 62.5%;
    input[type='button'] {
      cursor: pointer;
    }
    input[disabled] {
      cursor: default;
    }
    @media only screen and (max-width: 1560px),
    only screen and (max-device-width: 1560px) {
      font-size: 9.5px;
    }
    @media only screen and (max-width: $media_desktop),
    only screen and (max-device-width: $media_desktop) {
      font-size: 9px;
    }
    @media only screen and (max-width: $media_tablet),
    only screen and (max-device-width: $media_tablet) {
      font-size: 8px;
    }
  }
  *{
    box-sizing: border-box;
  }
  body {
    @apply bg-gray-800;
    @apply text-def-text;
  
    @apply text-base;
  line-height: 1.2;
  
  min-width: 320px;
  overflow-x: hidden;
  }
</style>