export default defineEventHandler((event) => {
  const { api } = useRuntimeConfig().public;

  console.log(api);
  return api;
});
