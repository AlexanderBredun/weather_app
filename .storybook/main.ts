import type { StorybookConfig } from "@storybook/vue3-vite";
import path from 'path';
import { mergeConfig } from 'vite';

import { viteFinal } from './viteConfig/viteConfig'

const config: StorybookConfig = {
  stories: [
    "../**/*.mdx",
    "../**/*.stories.@(js|jsx|mjs|ts|tsx)",
  ],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
  ],
  
  framework: {
    name: "@storybook/vue3-vite",
    options: {},
  }, 
  docs: {
    autodocs: "tag",
  },
  async viteFinal(config) {
    return await viteFinal(config)
	// 	return mergeConfig(config, {
	// 		resolve: {
	// 			alias: { '@': path.resolve(__dirname, '../'), '~': path.resolve(__dirname, '../') },
	// 		},
  //     define: {
  //       useNuxtApp: false
  //     },
	// 		css: {
	// 			postcss: null,
	// 			preprocessorOptions: {
	// 				scss: {
	// 					additionalData: '@import "../shared/lib/styles/_variables.scss";',
	// 				},
	// 			},
	// 		},
	// 	});
	},
};
export default config;
