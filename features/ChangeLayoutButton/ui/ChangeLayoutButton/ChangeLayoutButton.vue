<template>
    <button title="Edit layout" aria-label="Edit layout" @click.prevent="store.editLayout = !store.editLayout">
        <i v-if="!editLayout" class="fad fa-th-large fa-2x" ></i>
        <i v-else class="fas fa-check-double fa-2x text-green-600" ></i>
     </button>
 </template>
 
 
<script lang="ts" setup>
import { storeToRefs } from 'pinia';

const store = useMainStore();
const { editLayout } = storeToRefs(store);
    
</script>
 
 <style>
 
 </style>