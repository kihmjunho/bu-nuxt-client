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

  <ContentList :title="title.artwork" :data="list.artwork" />
  <ContentList :title="title.exhibition" :data="list.exhibition" />
  <ContentList :title="title.post" :data="list.post" />
</template>

<script setup lang="ts">
import type { Content, Contents } from '@/types/types';

const { api } = useRuntimeConfig().public;

const title = {
  artwork: 'recently artwork',
  exhibition: 'solo exhibition',
  post: 'recently post',
};

const list = reactive({
  artwork: [] as Content[],
  exhibition: [] as Content[],
  post: [] as Content[],
});

onMounted(async () => {
  const limit = 6;
  const page = 1;

  const { fetchByCategory, fetchBySubCategory } = useFetchBy(api);

  const artwork: Contents = await fetchByCategory('artwork', limit, page);
  list.artwork = artwork.data;

  const exhibition: Contents = await fetchBySubCategory('solo', 4, page);
  list.exhibition = exhibition.data;

  const post: Contents = await fetchByCategory('post', limit, page);
  list.post = post.data;
});
</script>
