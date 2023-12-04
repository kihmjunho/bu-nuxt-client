module.exports = {
  apps: [
    {
      name: 'bu-client',
      port: '4000',
      env: {
        NUXT_PUBLIC_API: 'https://bodyundefined.com/api/',
      },
      script: '.output/server/index.mjs',
    },
  ],
};
