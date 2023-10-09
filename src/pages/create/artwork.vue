<template>
  <Section>
    <SectionTitle>create artwork</SectionTitle>
    <CreateArtwork
      :categories="categories"
      @emitArtworkData="createEvent"
    />
  </Section>
</template>

<script setup lang="ts">
// definePageMeta({ middleware: 'owner' });
import { type Category, type CreateResponse } from '@/types/types';

const artwork = 'artwork';
const { api } = useRuntimeConfig().public;
const { push } = useRouter();

const categories = ref([] as Category[]);
onMounted(async () => {
  const { fetchSubCategories } = useFetchCategories(api);
  const data = await fetchSubCategories(artwork);
  categories.value = data;
});

const { sendImageFiles, createContent, getSubCategoryName } = useContent(api);

const createEvent = async (body: any) => {
  const { formData, artworkData } = body;

  await sendImageFiles(formData);
  const path = getSubCategoryName(categories.value, artworkData.subCategoryId);

  const response: CreateResponse = await createContent(artwork, artworkData);
  push(`/artwork/${path}/${response.id}`);
};
</script>
