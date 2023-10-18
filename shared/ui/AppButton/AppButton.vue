<template>
     <a v-if="attrs.href" target="_blank" rel="noopener nofollow" :class="[defaultClasses, btnClasese, variant]">
         <slot></slot>
     </a> 
     <nuxt-link v-else-if="attrs.to" :class="[defaultClasses, btnClasese, variant]">
         <slot></slot>
     </nuxt-link>
     <button v-else :class="[defaultClasses, btnClasese, variant]">
         <slot></slot>
     </button>
 </template>
 
<script setup lang="ts">
import { useAttrs, computed } from 'vue';

interface AppButtonProps{
	size?: 'sm' | 'md' | 'lg'
	variant?: 'clear'
}

const props = withDefaults(defineProps<AppButtonProps>(), {
	size: 'sm'
});
 
const attrs = useAttrs();

 
const defaultClasses = 'btn block text-white w-fit transition bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800';
 
const btnClasese = computed(() => {
	switch (props.size) {
	case 'md':
		return 'text-base px-6 py-4';
	case 'lg':
		return 'text-lg px-8 py-6';
	default:
		return 'text-sm px-4 py-2';
	}
});
</script>
 
 <style scoped lang="scss">
	.btn{
		&.clear{
			background: transparent;
			border: none;
			padding: 0;
		}
	}
</style>