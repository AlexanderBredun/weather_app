<template>
    <div  class="h-24 w-full overflow-hidden relative sunset-holder"
        :style="{ '--sunriseW': beforeMidnight(sunrise), '--sunsetW': 1 - beforeMidnight(sunset) }">
        <p class="line absolute top-1/2 left-0 -translate-y-1/2 w-full h-1 bg-white"></p>
        <div class="sun absolute flex justify-center items-center" :class="{ 'moon': !(sunsetCalc >= 0 && sunsetCalc <= 1) }"
            :style="{ '--sunPos': beforeMidnight(timeNow) }">
            <i v-if="sunsetCalc >= 0 && sunsetCalc <= 1"
                class="fal fa-sun text-yellow-300 shadow-yellow-500 drop-shadow-2xl animate-[spin_3s_linear_infinite]"></i>
            <i v-else class="fal fa-moon text-gray-600 shadow-white drop-shadow-2xl"></i>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

interface SunriseGraphicProps{
    sunrise: string,
    sunset: string,
    timeNow: string,
    triggerReload: string,
}

const props = defineProps<SunriseGraphicProps>();

const sunsetCalc = computed((): number => {
	const res = +(1 - ((new Date(props.sunset).getTime() - new Date(props.timeNow).getTime()) / (new Date(props.sunset).getTime() - new Date(props.sunrise).getTime()))).toFixed(2);
	return res;
});

const beforeMidnight = (time: string): number => {
	const mid = new Date(props.timeNow);
	const now = new Date(time).getTime();
	mid.setHours(24, 0, 0, 0);
	return +(1 - (Math.floor((mid.getTime() - now)) / 86400000)).toFixed(2);
};


</script>

<style scoped lang="scss">
.small {
    .sun {
        --size: 2em;
        i {
            font-size: 100%;
        }
    }
}
.medium {
    .sun {
        --size: 3em;
        i {
            font-size: 140%;
        }
    }
}

.sunset-holder {

    &:before,
    &:after {
        content: '';
        display: block;
        position: absolute;
        height: 100%;
        background: rgba(0, 0, 0, .20);
        top: 0;
        bottom: 0;
        z-index: 10;
    }

    &:before {
        left: 0;
        width: calc(var(--sunriseW) * 100%);
        border-right: 2px solid white;
    }

    &:after {
        right: 0;
        width: calc(var(--sunsetW) * 100%);
        border-left: 2px solid white;
    }
}

.sun {
    --size: 4em;

    // bottom: calc(100% * (var(--sunPosY) * 2) - (8em * var(--sunPosY)));
    // left: calc(100% * (var(--sunPosX)) - (4em * var(--sunPosX)));
    width: var(--size);
    height: var(--size);
    top: 50%;
    transform: translate3d(0, -50%, 0);
    left: calc(100% * (var(--sunPos)) - (var(--size) * var(--sunPos)));

    &.moon {
        i {
            animation: move1 8s infinite linear;
        }

        &:after {
            background: radial-gradient(#88dacf, #9198e504 70%, rgba(0, 0, 0, 0));
        }
    }

    &:after {
        content: '';
        display: block;
        width: 100%;
        height: 100%;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate3d(-50%, -50%, 0);
        background: radial-gradient(#e4e664, #9198e504 70%, rgba(0, 0, 0, 0));
        z-index: 0;

    }

    i {
        z-index: 2;
        position: relative;
        font-size: 200%;
    }

    @keyframes move1 {
        0% {
            transform: translateY(0);
        }

        25% {
            transform: translateY(20%);
        }

        75% {
            transform: translateY(-20%);
        }

        100% {
            transform: translateY(0);
        }
    }

    @keyframes move2 {
        to {
            transform: translateY(256px);
        }
    }
}</style>