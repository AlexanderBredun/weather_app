

<template>
    <div class="container mx-auto px-4">

        <swiper class="!pb-16 locations-slider" :modules="modules" :slides-per-view="1" :noSwiping="true"
                noSwipingClass="swipe-no" :watchOverflow="false" :space-between="50" :navigation="!disabled"
                :pagination="{ clickable: true }" @swiper="onInit">
            <slot name="default" :SwiperSlide="SwiperSlide"></slot>
        </swiper>
    </div>
</template>

<script setup lang="ts">
import { Navigation, Pagination } from 'swiper/modules';
import { Swiper as tSwiper } from 'swiper/types';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { watch, ref } from 'vue';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

interface LocationsSliderProps{
    disabled?: boolean;
    slideTo?: number
}

const props = defineProps<LocationsSliderProps>();

const initedSwiper = ref<tSwiper>();

const onInit = (swiper: tSwiper) => {
	initedSwiper.value = swiper;
};


watch(()=> props.slideTo,
	(val) => {
		if(val !== undefined){
			setTimeout(() => {
				initedSwiper.value?.slideTo(val);
			}, 500);
		}
	});

watch(()=> props.disabled,
	(val) => {

		if (val) {
			initedSwiper.value?.disable();
		}
		else {
			initedSwiper.value?.enable();
		}
	});


const modules = [Navigation, Pagination];

</script>

<style scoped lang="scss">
:deep(.swiper) {

    @apply pt-24 mt-24;
    overflow-y: unset;

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
                background: url(/ico_loc.svg) center center no-repeat;
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