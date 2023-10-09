<template>
  <Section>
    <SectionTitle>create post</SectionTitle>
    <CreatePost
      :type="post"
      :categories="categories"
      @emitUpload="createEvent"
    />
  </Section>
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

const { sendImageFiles, createContent, getSubCategoryName } = useContent(api);

const createEvent = async (body: any) => {
  const { formData, postData } = body;

  await sendImageFiles(formData);
  const path = getSubCategoryName(categories.value, postData.subCategoryId);

  const response: CreateResponse = await createContent(post, postData);
  push(`/post/${path}/${response.id}`);
};
</script>
