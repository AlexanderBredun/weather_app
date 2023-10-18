<template>
  <div>
    <NuxtLayout>
      <NuxtLoadingIndicator />
      <AppHeader />
      <NuxtPage />

      <SlideInPage :query="eRoutes.ADD_LOCATION">
        <AddLocation  />
      </SlideInPage>
      <SlideInPage :query="eRoutes.ALL_LOCATIONS">
        <AllLocations  />
      </SlideInPage>
      
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
import { addLocalStorage, eLocalStorageKeys, eRoutes } from './shared/lib/utils';
import { AddLocation } from './widgets/AddLocation';
import { AllLocations } from './widgets/AllLocations';
import { AppHeader } from './widgets/AppHeader';
import { SlideInPage } from './widgets/SlideInPage';

const store = useMainStore();
const { addPositionActive } = store;
addPositionActive();

useStructureStore().$subscribe((mutation, state) => {
	addLocalStorage(eLocalStorageKeys.STRUCTURE, [state.locationsStructurees], true);
});


</script>

<style lang="scss">
 
</style>