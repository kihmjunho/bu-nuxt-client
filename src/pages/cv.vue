<template>
  <Head>
    <Title>BODY UNDEFINED</Title>
    <Meta name="description" content="Try something I have never done" />
    <Meta property="og:description" content="Try something I have never done" />
    <Meta
      property="og:image"
      content="https://buimages.s3.ap-northeast-2.amazonaws.com/cover.jpg"
    />
  </Head>
</template>

<script setup lang="ts">
const { api } = useRuntimeConfig().public;

const list = reactive({
  solo: [] as any,
  group: [] as any,
});

onMounted(async () => {
  const { fetchExhibitionsBy } = useFetchBy(api);
  const solo = await fetchExhibitionsBy('solo');
  list.solo = solo;
  console.log(solo);
  const group = await fetchExhibitionsBy('group');
  list.group = group;
  console.log(group);
});
</script>
