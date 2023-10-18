<template>
    <AppDropdown v-if="blocks.length" options-full-width title="Add more information" aria-label="Add more information" class="bg-def-bg shadow-def-bg shadow-def border-blue-600 border transition-all duration-300 rounded-xl hover:bg-violet-500 hover:rounded-t-xl hover:rounded-b-none block w-full p-2.5 ">
          <template #title>
              <p class="m-0">Add more information</p>
          </template>
          <template #content>
                  <p v-for="item in blocks" :key="item.id" class="w-full bg-violet-500 last-of-type:rounded-b-xl py-4 px-6 text-md transition-all hover:bg-violet-400">
                      <a href="" role="button" @click.prevent="addBlock(item)">
                          {{ item.displayName }}
                      </a>
                  </p>
          </template>
      </AppDropdown>
  
  </template>
  
<script lang="ts" setup>
import { iStructureItem } from '~/shared/lib/types';
import AppDropdown from '~/shared/ui/AppDropdown/AppDropdown.vue';


const props = defineProps({
	blocks: {
		type: Array<iStructureItem>,
		required: true
	} ,
	parentId: {
		type: String,
		required: true
	}
});
  
const store = useStructureStore();
  
  
const addBlock = (item: iStructureItem)=> {
	store.addTile(item, props.parentId);
};
  
</script>
  
  <style>
  
  </style>