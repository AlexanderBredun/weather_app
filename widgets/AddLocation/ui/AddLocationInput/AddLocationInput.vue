<template>
      <form class="mb-8" @submit.prevent>
            <label for="default-search"
                class="mb-2 text-sm font-medium text-white sr-only ">Search</label>
            <div class="relative">
                <div  class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <svg v-if="!loading" aria-hidden="true" class="w-5 h-5 text-gray-500" fill="none"
                        stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                    </svg>
                    <AppLoader v-else class="" color="lightblue" :size="20" />
                </div>
                <input type="search" v-model="addLocStore.search" @focus="searchFocused = true" id="default-search" aria-label="Add city" name="search"
                    placeholder="Add city"
                    class="block w-full p-4 pl-12 text-sm text-black border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 "
                    required>
                

            </div>
        </form>
</template>

<script lang="ts" setup>
import { storeToRefs } from 'pinia';
import AppLoader from '~/shared/ui/AppLoader/AppLoader.vue';
import { useAddLocationStore } from '../../store/useAddLocationStore';

const addLocStore = useAddLocationStore();
const { searchFocused, loading } = storeToRefs(addLocStore);


</script>

<style lang="scss" scoped>


</style>