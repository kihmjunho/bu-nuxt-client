// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ['@pinia/nuxt', '@vite-pwa/nuxt'],
  pwa: {
    manifest: {
      name: 'bodyundefined',
      short_name: 'bodyundefined',
      description: 'Try something I have never done',
      icons: [
        {
          src: 'https://buimages.s3.ap-northeast-2.amazonaws.com/buicon.png',
          sizes: '144x144',
          type: 'image/png',
        },
      ],
    },
    workbox: {
      navigateFallback: '/',
    },
    devOptions: {
      enabled: true,
      type: 'module',
    },
  },
  srcDir: 'src',
  // devtools: { enabled: true },
  runtimeConfig: {
    public: {
      api: 'http://localhost:8000/',
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
