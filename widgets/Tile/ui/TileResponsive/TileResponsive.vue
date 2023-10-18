<template>
    <div v-if="!isMobile" class="desktop-container" :class="desktopClasses">
        <slot name="desktop"></slot>
    </div>
    <div v-else class="mobile-container mt-4 relative" :class="mobileClasses" @click="moreDetails = true">
        <slot name="mobile"></slot>
    </div>
    <Teleport to="body">
        <SlideInSection :show-status="moreDetails" @hide="moreDetails = false" :class="mobilePopupClasses">
            <slot name="mobile-popup"></slot>
        </SlideInSection>
    </Teleport>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { SlideInSection } from '@/entities/SlideInSection';
import { useIsMobile } from '~/shared/hooks';

defineProps({
	desktopClasses: String,
	mobileClasses: String,
	mobilePopupClasses: String,
});

const moreDetails = ref<boolean>(false);

const { isMobile } = useIsMobile(1000);
</script>


<style lang="scss" scoped>

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
}
</style>