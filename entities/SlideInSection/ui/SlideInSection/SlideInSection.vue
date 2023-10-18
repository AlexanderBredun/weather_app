<template>
    <Transition name="slide-in">
        <div v-if="showStatus"
            class="p-5 sm:p-10 md:p-20 !pt-20 bg-blue-800 h-[calc(100%_-_6rem)] shadow-def-bg shadow-def border-blue-600 border transition-all duration-300 rounded-t-xl container mx-auto fixed overflow-auto bottom-0 left-1/2 -translate-x-1/2 z-50">

            <button class="absolute top-6 right-6" @click.prevent="$emit('hide')">
                <i class="fas fa-arrow-down"></i>
            </button>

            <slot></slot>

           
        </div>
    </Transition>
</template>

<script lang="ts" setup>
defineProps({
	showStatus: {
		type: Boolean,
		required: true,
	}
});
defineEmits(['hide']);
</script>

<style>
.slide-in-enter-active,
.slide-in-leave-active {
    transition: transform 0.5s ease;
}

.slide-in-enter-from,
.slide-in-leave-to {
    transform: translate3d(-50%, 100%, 0);
}
</style>