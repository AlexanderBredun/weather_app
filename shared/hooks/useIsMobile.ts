
import { onBeforeUnmount, onMounted, ref } from 'vue';


export const useIsMobile = (size: number) => {
	const isMobile = ref<boolean>(false);

	const onResize = () => {

		isMobile.value = window.innerWidth < size;
	};

	onMounted(() => {

		onResize();
		window.addEventListener('resize', onResize);
	});

	onBeforeUnmount(() => {
		if (typeof window !== 'undefined') {
			window.removeEventListener('resize', onResize);
		}
	});

	return { isMobile };
};