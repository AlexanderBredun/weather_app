<template>
    <div class="lds-ring" :class="{'smSize': size === 20}" :style="{ '--loader-color': color, width: `${size}px`, height: `${size}px` }"><div></div><div></div><div></div><div></div></div>
  </template>
  
<script setup lang="ts">
  interface LoaderProps {
    size?: 20 | 80;
    color?: string; 
   
}

withDefaults(defineProps<LoaderProps>(), {
	color: '#fff',
	size: 80,
});
</script>
  
  <style scoped lang="scss">
  .lds-ring {
    display: block;
    position: relative;
    &.smSize{
      div{
        border-width: .2em;
      }
    }
  }
  .lds-ring div {
    box-sizing: border-box;
    display: block;
    position: absolute;
    width: 90%;
    height: 90%;
  
    border: .8em solid #fff;
    border-radius: 50%;
    animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
    border-color: var(--loader-color) transparent transparent transparent;
  }
  .lds-ring div:nth-child(1) {
    animation-delay: -0.45s;
  }
  .lds-ring div:nth-child(2) {
    animation-delay: -0.3s;
  }
  .lds-ring div:nth-child(3) {
    animation-delay: -0.15s;
  }
  @keyframes lds-ring {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
  
  </style>