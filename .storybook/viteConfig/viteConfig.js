import { fileURLToPath } from 'node:url';
import { join } from 'node:path';
import { createPinia } from "pinia";
import { mergeConfig } from 'vite';
import vuePlugin from '@vitejs/plugin-vue';
import viteJsxPlugin from '@vitejs/plugin-vue-jsx';
export const viteFinal = async (config) => {
    const nuxtViteConfig = await useNuxtViteConfig();
    const { viteConfig, nuxt } = nuxtViteConfig;
    // https://github.com/storybookjs/storybook/issues/20817
    if (config.plugins) {
        config.plugins = config.plugins.filter((plugin) => {
            if (plugin !== null &&
                typeof plugin === 'object' &&
                'name' in plugin &&
                plugin.name === 'vite:vue') {
                return false;
            }
            return true;
        });
    }
    nuxt.ready()
    return mergeConfig({
        resolve: viteConfig.resolve,
        optimizeDeps: viteConfig.optimizeDeps,
        plugins: viteConfig.plugins,
        define: viteConfig.define,
        css: {
            postcss: null,
            preprocessorOptions: {
                scss: {
                    additionalData: '@import "@/shared/lib/styles/_variables.scss";',
                },
            },
        },

    }, config);
};
const vuePlugins = {
    'vite:vue': [vuePlugin, 'vue'],
    'vite:vue-jsx': [viteJsxPlugin, 'vueJsx'],
};
async function useNuxtViteConfig() {
    const { loadNuxt, buildNuxt } = await import('@nuxt/kit');
    const nuxt = await loadNuxt({
        // cwd: process.cwd(),
        ready: false,
        dev: process.env.NODE_ENV === 'development',
        overrides: {
            ssr: false,
            app: {
                rootId: 'nuxt-test',
            },
            modules: ['@pinia/nuxt'],
            _modules: ['@pinia/nuxt'],
            pages: false,
        },

    });
    nuxt.hook('imports:sources', (presets) => {
        const stubbedComposables = ['useNuxtApp']; 
        const appPreset = presets.find((p) => p.from === '#app');
        if (appPreset) {
            appPreset.imports = appPreset.imports.filter((i) => typeof i !== 'string' || !stubbedComposables.includes(i));
        }
        presets.push({
            from: '@/.storybook/viteConfig/composables.mjs',
            imports: stubbedComposables,
        });
    });
    return {
        viteConfig: await new Promise((resolve, reject) => {
            nuxt.hook('app:resolve', (app) => {
                const pinia = createPinia();

            })
            nuxt.hook('modules:done', () => {
                nuxt.hook('components:extend', (components) => {
                    for (const name of ['NuxtLink']) {
                        Object.assign(components.find((c) => c.pascalName === name) || {}, {
                            export: name,
                            filePath: '@/.storybook/viteConfig/components.mjs',
                        });
                    }
                });
                nuxt.hook('vite:extendConfig', (config, { isClient }) => {
                    if (isClient) {
                        for (const name in vuePlugins) {
                            if (!config.plugins?.some((p) => p?.name === name)) {
                                const [plugin, key] = vuePlugins[name];
                                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                                // @ts-ignore
                                config.plugins.push(plugin(config[key]));
                            }
                        }
                        resolve({ ...config });
                    }
                });
            });
            nuxt
                .ready()
                .then(() => buildNuxt(nuxt))
                .catch((err) => {
                    if (!err.toString().includes('_stop_')) {
                        reject(err);
                    }
                });
        }),
        nuxt,
    };
}
