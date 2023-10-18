<template>
    <li class="flex justify-start ">
        <p class="w-1/2 mr-5 text-sm">
            {{ title }}
        </p>
        <p class="w-1/2 text-sm" :class="mobile ? 'text-right' : ''">
           <slot></slot>
        </p>
    </li>
</template>

<script lang="ts" setup>
interface MainInfoTileItemInfoProps {
    title: string;
    mobile?: boolean;
 }

defineProps<MainInfoTileItemInfoProps>();

</script>

<style lang="scss" scoped></style>