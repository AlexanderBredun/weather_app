<template>
    <AppButton variant="clear" title="Close tab" aria-label="Close tab" @click.prevent="closeTab">
         <i class="fal fa-times-circle fa-lg"></i>
     </AppButton>
 </template>
 
 
<script lang="ts" setup>
import AppButton from '~/shared/ui/AppButton/AppButton.vue';

interface CloseTileButtonProps{
    parentId: string;
}

const props = defineProps<CloseTileButtonProps>();

const store = useStructureStore();
 
const closeTab = ()=> {
	store.removeTile(props.parentId);
};
</script>
 
 <style>
 
 </style>