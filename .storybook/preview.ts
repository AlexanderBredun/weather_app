import { Preview, setup } from "@storybook/vue3";

import { createPinia } from "pinia";

import "@/shared/lib/styles/tailwind.css";
import "@/shared/lib/styles/main.scss";


const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },

    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },

  },
  
};



/*
 * Pinia store set up
 */
const pinia = createPinia();

setup((app) => {

  app.use(pinia);
});

export default preview;