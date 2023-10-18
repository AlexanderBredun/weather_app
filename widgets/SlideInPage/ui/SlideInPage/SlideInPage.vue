<template>
    <SlideInSection :show-status="isNeedToShow" @hide="hide" v-click-outside="hide">
        <slot></slot>
    </SlideInSection>
</template>

<script lang="ts" setup>
import { SlideInSection } from '~/entities/SlideInSection';
import { eRoutes } from '~/shared/lib/utils';

interface SlideInPageProps {
    query: eRoutes
 }

const props = defineProps<SlideInPageProps>();


const route = useRoute();
const router = useRouter();
const isNeedToShow = computed(()=> route.query[props.query] === null);

onMounted(()=> {
	if(isNeedToShow.value){
		document.body.classList.add('overflow-hidden');
	}
});

watch(()=> isNeedToShow.value, (val)=> {
	if(val){
		document.body.classList.add('overflow-hidden');
	}
	else{
		document.body.classList.remove('overflow-hidden');
	}
});

const hide = () => {
	const query = Object.assign({}, route.query);
	delete query[props.query];
	router.replace({ query });
};
provide<()=> void, 'hideSlidePage'>(/* key */ 'hideSlidePage', /* value */ hide);
</script>

<style lang="scss" scoped></style>