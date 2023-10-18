<template>
    <ul class="absolute top-2 right-4 flex items-center space-x-4 z-30">
          <li class=" ">
            <RefreshDataButton :size="'sm'" :parent-id="parentId" />
          </li>
          <li>
            <ChangeTileSizeButton :parent-id="parentId"/>
          </li>
          <li>
            <CloseTileButton :parent-id="parentId"/>
          </li>
         
        </ul>
  </template>
  
<script setup lang="ts">
import { ChangeTileSizeButton } from '~/features/ChangeTileSizeButton';
import { CloseTileButton } from '~/features/CloseTileButton';
import { RefreshDataButton } from '~/features/RefreshDataButton';


interface TileSettingsProps{
    parentId: string
}

defineProps<TileSettingsProps>();
  
  
</script>
  
  <style>
  
  </style>