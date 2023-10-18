<script setup lang="ts">
import { ref } from 'vue';
import SlideInSection from '@/components/layouts/SlideInSection.vue'

defineProps({
    desktopClasses: String,
    mobileClasses: String,
    mobilePopupClasses: String,
})

const moreDetails = ref<boolean>(false)
</script>

<template>
    <div class="desktop-container" :class="desktopClasses">
        <slot name="desktop"></slot>
    </div>
    <div class="mobile-container mt-4 relative" :class="mobileClasses" @click="moreDetails = true">
        <slot name="mobile"></slot>
    </div>
    <Teleport to="body">
        <SlideInSection :show-status="moreDetails" @hide="moreDetails = false" :class="mobilePopupClasses">
        <slot name="mobile-popup"></slot>
        </SlideInSection>
    </Teleport>
    
</template>



<style lang="scss" scoped>
@import "assets/styles/variables";

.mobile-container {
    display: none;
    height: 100%;
}

.tile {
    &.small {
        iframe {
            max-width: 10rem;
        }
    }

    &.small,
    &.medium {
        @include maxrwd(1000) {
            .desktop-container {
                display: none;
            }

            .mobile-container {
                display: block;
            }
        }
    }

    &.large {
        justify-content: center;

        .image-block {
            max-width: 20%;

            @include md {
                max-width: 100%;
            }
        }

        .aside-block {
            max-width: 80%;

            @include md {
                max-width: 35%;
            }
        }
    }
}</style>