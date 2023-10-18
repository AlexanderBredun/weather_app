<template>
    <a v-if="attrs.href" target="_blank" rel="noopener nofollow" :class="[defaultClasses, btnClasese]">
        <slot></slot>
    </a>
    <nuxt-link v-else-if="attrs.to" :class="[defaultClasses, btnClasese]">
        <slot></slot>
    </nuxt-link>
    <button v-else :class="[defaultClasses, btnClasese]">
        <slot></slot>
    </button>
</template>

<script setup lang="ts">
import { useAttrs, computed } from 'vue'

const attrs = useAttrs()
const props = defineProps({
    size: {
        type: String,
        default: 'sm',
        validator(value: string) {
            return ['sm', 'md', 'lg'].includes(value)
        }
    }
})

const defaultClasses = 'block text-white w-fit  bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'

const btnClasese = computed(() => {
    switch (props.size) {
        case 'md':
            return 'text-md px-6 py-4'
        case 'lg':
            return 'text-lg px-8 py-6'
        default:
            return 'text-sm px-4 py-2'
    }
})
</script>

<style></style>