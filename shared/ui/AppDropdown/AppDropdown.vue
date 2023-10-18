<template>
    <button  class="group relative ">
      <slot name="title"></slot>
      <div class="hidden divide-y absolute top-full left-1/2 -translate-x-2/4 group-hover:block z-30 rounded-md overflow-hidden isolate" :class="optionsFullWidth && 'w-full'">
          <slot name="content"></slot>
      </div>
    </button>
  </template>
  
<script lang="ts" setup>
interface AppDropdownProps{
    optionsFullWidth?: boolean;
}

defineProps<AppDropdownProps>();

</script>
  
  <style>
  
  </style>