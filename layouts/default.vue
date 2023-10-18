<template>
    <Header />
    <add-location />
    <all-cities />
    <slot />
</template>

<script setup lang="ts">
    import Header from '@/components/widgets/Header.vue'
    import AddLocation from '@/components/widgets/AddLocation.vue'
    import AllCities from '@/components/widgets/AllCities.vue'
</script>

<style scoped>

</style>