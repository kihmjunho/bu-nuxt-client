<template>
  <ContentList :title="title.artwork" :data="artwork" />
  <ContentList :title="title.exhibition" :data="exhibition" />
  <ContentList :title="title.post" :data="post" />
</template>

<script setup lang="ts">
import { Content, Contents } from '@/types/types';

const { api } = useRuntimeConfig().public;

const title = {
  artwork: 'recently artwork',
  exhibition: 'solo exhibition',
  post: 'recently post',
};

const artwork = ref<Content[]>([]);
const exhibition = ref<Content[]>([]);
const post = ref<Content[]>([]);

onMounted(async () => {
  const limit = 6;
  const page = 1;

  const { fetchContentByCategory } = useFetchContent(api);

  const artworkData: any = await fetchContentByCategory('artwork', limit, page);
  artwork.value = artworkData.data;

  const exhibitionData: Contents = await fetchContentByCategory(
    'exhibition',
    4,
    page
  );
  exhibition.value = exhibitionData.data;

  const postData: Contents = await fetchContentByCategory('post', limit, page);
  post.value = postData.data;
});
</script>
