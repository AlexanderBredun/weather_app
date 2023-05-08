<template>
    <div class="container mx-auto px-4">

        <swiper v-if="locations.length && !loading" class="!pb-16" :modules="modules" :slides-per-view="1"
        :noSwiping="true"
        noSwipingClass="swipe-no"
            :watchOverflow="false" :space-between="50" :navigation="!editLayout" :pagination="{ clickable: true }"
            @swiper="onInit">
            <swiper-slide v-for="(loc, id) in locations" :key="loc.id">

                <div class="flex justify-between items-center mb-10 mt-24">
                    <CityNameHeading :name="loc.city" class="m-0" />
                    <div class="self-center ">
                        <div class="mb-8">
                            <CloseLocationButton v-if="id !== 0" :parent-id="loc.id" class="mr-8" />
                            <ChangeLayoutButton />
                        </div>

                        <AddMoreInfoDropdown class="z-40" :blocks="locationsStructurees[loc.id].availableBlocks" :parent-id="loc.id" />

                    </div>
                </div>
                <TilesFlow :pos-data="{pos: loc.pos, timezone: loc.timezone}" :structure="locationsStructurees[loc.id].structure" />
            </swiper-slide>
        </swiper>
        <Loader v-else-if="loading" class="mx-auto  mt-32" />
        <div v-else class="mt-32 text-center">
            <h3 class="mb-8">
                Nothing there( Allow location access in browser or add location
            </h3>
            <AppButton size="lg" class="mx-auto" to="/?add-location">
                Add location
            </AppButton>
        </div>

    </div>
</template>

<script setup lang="ts">
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Navigation, Pagination } from 'swiper';
import type { Swiper as SwiperType } from 'swiper'
import { useMainStore } from '@/store/index'
import { watch, ref, computed } from 'vue'
import AppButton from '@/components/shared/ui/AppButton.vue'
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import AddMoreInfoDropdown from '@/components/features/locationUtility/AddMoreInfoDropdown.vue'
import CityNameHeading from '@/components/shared/CityNameHeading.vue'
import CloseLocationButton from '@/components/features/locationUtility/CloseLocationButton.vue'
import ChangeLayoutButton from '@/components/features/locationUtility/ChangeLayoutButton.vue'
import Loader from '@/components/shared/Loader.vue'
import TilesFlow from '@/components/layouts/TilesFlow.vue'

const store = useMainStore()
const { locations, loading, slideToLocation, editLayout } = storeToRefs(store)

const storeStructure = useStructureStore()
const { locationsStructurees } = storeToRefs(storeStructure)

const initedSwiper = ref();

const onInit = (swiper: SwiperType) => {
    initedSwiper.value = swiper;
};


watch(slideToLocation,
    (val) => {
    
        setTimeout(() => {
            initedSwiper.value?.slideTo(val)
        }, 500)
    })
watch(editLayout,
    (val) => {
        
        if (val) {
            initedSwiper.value?.disable()
        }
        else {
            initedSwiper.value?.enable()
        }
    })


const modules = [Navigation, Pagination];

</script>

<style scoped lang="scss">
:deep(.swiper) {

    @apply pt-24 mt-24;

    .swiper-slide {
        padding: 0 4rem;
    }

    .swiper-pagination {
        bottom: auto;
        top: 1rem;
        display: flex;
        justify-content: center;
        align-items: center;

        .swiper-pagination-bullet {
            width: 1.5rem;
            height: 1.5rem;
            background: #fff;
            transition: .3s;

            &-active {
                width: 2rem;
                height: 2rem
            }

            &:only-child {
                display: block !important;
            }

            &:first-of-type {
                background: url(./ico_loc.svg) center center no-repeat;
                background-size: cover;

                &.swiper-pagination-bullet-active {
                    width: 3rem;
                    height: 3rem;

                }

                &:hover {
                    position: relative;

                    &:before {
                        content: 'Current location';
                        position: absolute;
                        top: 100%;
                        left: 50%;
                        transform: translate3d(-50%, 0, 0);
                        @apply text-sm bg-blue-600;
                        width: max-content;

                    }
                }

            }

        }
    }

    .swiper-button-next,
    .swiper-button-prev {
        top: 1rem;
        transform: none;
        padding: .8rem 1rem;
        margin: 0;
        height: auto;
        z-index: 50;
        @apply bg-def-bg;
        transition: .3s;

        &:hover {
            @apply bg-blue-600;
        }

        &:after {
            font-size: 1.7rem;
            color: #fff;

        }
    }
}
</style>