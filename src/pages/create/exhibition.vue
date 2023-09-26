<template>
  <ClientOnly>
    <!-- <SectionBox> -->
    <!-- <SectionTitle>create post</SectionTitle> -->
    <CreateContent
      :type="exhibition"
      :categories="categories"
      @emitUpload="createEvent"
    />
    <!-- </SectionBox> -->
  </ClientOnly>
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

const { createContent } = useCreateContent(api);

const createEvent = async (body: any) => {
  const category = categories.value.find(
    (item) => item.id === body.emitData.subCategoryId
  );
  const path = category ? category.name : undefined;

  const response: CreateResponse = await createContent(exhibition, body);
  push(`/exhibition/${path}/${response.id}`);
};
</script>
