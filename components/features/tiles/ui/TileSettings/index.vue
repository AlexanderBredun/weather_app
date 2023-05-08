<template>
  <ul class="absolute top-2 right-4 flex space-x-4 z-30">
        <li class=" ">
          <RefreshDataButton :parent-id="parentId" />
        </li>
        <li>
          <ChangeBlockSize :parent-id="parentId"/>
        </li>
        <li>
          <CloseTabButton :parent-id="parentId"/>
        </li>
       
      </ul>
</template>

<script setup lang="ts">
  import RefreshDataButton from '@/components/shared/RefreshDataButton.vue'
  import ChangeBlockSize from './ui/ChangeBlockSize.vue'
  import CloseTabButton from './ui/CloseTabButton.vue'

  const props = defineProps({
        parentId: {
            type: String,
            required: true
        }
    })

</script>

<style>

</style>