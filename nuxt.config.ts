// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ['@pinia/nuxt'],
  srcDir: 'src',
  // devtools: { enabled: true },
  runtimeConfig: {
    public: {
      api: 'https://api.bodyundefined.com/',
    },
  },
  app: {
    head: {
      htmlAttrs: {
        lang: 'ko',
      },
      viewport: 'width=device-width, initial-scale=1',
    },
  },
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@import "@/assets/styles.scss";',
        },
      },
    },
  },
});
