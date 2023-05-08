<template>
    <p  class="info-dropdown flex justify-start relative z-20">
        <span class="mr-2">
            <slot></slot>
        </span>
        <i class="icon-info fal fa-info-circle  " :data-text="text"></i>
    </p>
 
</template>

<script setup lang="ts">
    const props = defineProps({
        text: String
    })
</script>

<style lang="scss">
.info-dropdown{
    &:hover .icon-info:after{
        display: block;
    } 
}
    .icon-info{
        &:after{
            content: attr(data-text);
            display: block;
            position: absolute;
            display: none;
            left: 50%;
            top: 100%;
            transform: translate3d(-50%, 0, 0);
            width: 200px;
            font-family: Quicksand, sans-serif;
            padding: 1rem;
            @apply text-sm;
            border-radius: 1.2rem;
            background: linear-gradient(90deg, rgb(90, 49, 185) 0%, rgb(136, 74, 155) 100%);
        }
    }
</style>