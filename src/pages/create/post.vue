<template>
  <!-- <SectionBox> -->
  <!-- <SectionTitle>create post</SectionTitle> -->
  <CreateContent
    :type="post"
    :categories="categories"
    @emitUpload="createEvent"
  />
  <!-- </SectionBox> -->
</template>

<script setup lang="ts">
import { type Category, type CreateResponse } from '@/types/types';

// definePageMeta({ middleware: 'owner' });

const post = 'post';

const { api } = useRuntimeConfig().public;
const { push } = useRouter();

const categories = ref([] as Category[]);

onMounted(async () => {
  const { fetchSubCategories } = await useFetchCategories(api);
  const data = await fetchSubCategories(post);
  categories.value = data;
});

const createEvent = async (body: any) => {
  const { createContent } = useCreateContent(api);
  const category = categories.value.find(
    (item) => item.id === body.emitData.subCategoryId
  );
  const path = category ? category.name : undefined;

  const response: CreateResponse = await createContent('post', body);
  push(`/post/${path}/${response.id}`);
};
</script>
