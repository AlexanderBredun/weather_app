<script setup lang="ts">
    import Loader from '@/components/shared/Loader.vue'
    import TileSettings from '@/components/features/tiles/ui/TileSettings/index.vue'
    import RefreshDataButton from '@/components/shared/RefreshDataButton.vue'
    import {defineProps, watch} from 'vue'

   const props = defineProps({
      tileId: {
        type: String,
        required: true
      },
      tag: {
        type: String,
        default: 'div'
      },
      noSettings: Boolean,
      error: {
        type: [Error, Boolean],
        default: false
      },
      loading: {
        type: Boolean,
      } 
    })
   
   
</script>

<template>
  <component 
  class="tile-holder bg-def-bg shadow-def-bg shadow-def border-blue-600 border flex flex-col justify-center  hover:bg-blue-700 transition-all duration-300 rounded-xl relative"
  :class="{'text-center p-12 flex items-center justify-center': loading}"
   :is="tag">
    <Loader v-if="loading" />
    <div v-else-if="error" class="flex items-center justify-center w-full h-full" >
      <p v-if="!noSettings">
        Something went wrong. Please <RefreshDataButton :parent-id="tileId">try again</RefreshDataButton>
      </p>
      <p v-else>
        Something went wrong. Please try again
      </p>
    </div>
    <template v-else>
      
      <TileSettings v-if="!noSettings" :parent-id="tileId" />
      <slot  ></slot>
    </template>
    
  </component>
</template>



<style scoped lang="scss">
@import "assets/styles/variables";
  .tile-holder{
    @include rwd(1000) {
      height: fit-content;
      min-height: 290px;
    }
    
  }
</style>