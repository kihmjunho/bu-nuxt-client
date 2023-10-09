<template>
  <Section>
    <SectionTitle>create exhibition</SectionTitle>
    <CreateExhibition
      :type="exhibition"
      :categories="categories"
      @emitExhibitionData="createEvent"
    />
  </Section>
</template>

<script setup lang="ts">
import { type Category, type CreateResponse } from '@/types/types';

// definePageMeta({ middleware: 'owner' });

const exhibition = 'exhibition';
const { api } = useRuntimeConfig().public;
const { push } = useRouter();

const categories = ref([] as Category[]);

onMounted(async () => {
  const { fetchSubCategories } = await useFetchCategories(api);
  const data = await fetchSubCategories(exhibition);
  categories.value = data;
});

const { sendImageFiles, createContent, getSubCategoryName } = useContent(api);

const createEvent = async (body: any) => {
  const { formData, exhibitionData } = body;

  await sendImageFiles(formData);
  const path = getSubCategoryName(
    categories.value,
    exhibitionData.subCategoryId
  );

  const response: CreateResponse = await createContent(
    exhibition,
    exhibitionData
  );
  push(`/exhibition/${path}/${response.id}`);
};
</script>
