<template>
    <div class="relative" v-click-outside="()=> addLocStore.searchFocused = false">
        <AddLocationInput />
        <SearchResult />
    </div>
</template>

<script lang="ts" setup>
import { useAddLocationStore } from '../../store/useAddLocationStore';
import AddLocationInput from '../AddLocationInput/AddLocationInput.vue';
import SearchResult from '../SearchResult/SearchResult.vue';

const addLocStore = useAddLocationStore();
</script>

<style lang="scss" scoped></style>