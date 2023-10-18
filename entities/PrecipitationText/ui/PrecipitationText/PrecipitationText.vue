<template>
   
    <TextRain >{{ power(rain) }} rain</TextRain>
    <TextRain v-if="snow">{{ power(snow) }} snowfall</TextRain>
</template>

<script setup lang="ts">
import TextRain from '~/shared/ui/TextRain/TextRain.vue';

interface PrecipitationTextProps{
	rain: number;
	snow?: number;
}

defineProps<PrecipitationTextProps>();

const power = (val: number): string => {
	if(val <= 5 && val > 0){
		return 'Light';
	}
	else if(val === 0){
		return 'No';
	}
	else if(val > 5 && val <= 15){
		return 'Moderate';
	}
	
	return 'Heavy';
};

</script>

<style>

</style>