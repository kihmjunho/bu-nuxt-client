<template>
  <!-- <ClientOnly> -->
  <Section>
    <SectionTitle>create artwork</SectionTitle>
    <CreateContent
      :type="artwork"
      :categories="categories"
      @emitUpload="createEvent"
    />
  </Section>
  <!-- </ClientOnly> -->
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

const { createContent } = useCreateContent(api);
const createEvent = async (body: any) => {
  const category = categories.value.find(
    (item) => item.id === body.emitData.subCategoryId
  );
  const path = category ? category.name : undefined;

  const response: CreateResponse = await createContent(artwork, body);
  push(`/artwork/${path}/${response.id}`);
};
</script>
