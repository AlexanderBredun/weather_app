<template>
    <div class="flex justify-start">
        <h2 class="mr-4">
            {{ name }}
        </h2>
        <div>
            <slot></slot>
        </div>
    </div>
</template>
 
<script setup lang="ts">

interface HeadingWithExtraProps {
    name: string
}

defineProps<HeadingWithExtraProps>();

</script>
 