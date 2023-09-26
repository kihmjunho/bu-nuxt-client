<template>
  <Section>
    <SectionTitle>{{ computedTitle }}</SectionTitle>
    <UpdateArtwork
      :data="post"
      :categories="categories"
      @emitUpdate="updateEvent"
    />
  </Section>
</template>

<script setup lang="ts">
const { api } = useRuntimeConfig().public;

import { Category, Params } from '@/types/types';

const categories = ref<Category[]>([]);
const post = ref<any>({});

const params = useRoute().params as unknown;
const { category, subCategory, id } = params as Params;

const computedTitle = computed(() => `update ${category}`);

onMounted(async () => {
  const { fetchSubCategories } = useFetchCategories(api);
  const fetchCategories = await fetchSubCategories(category);
  categories.value = fetchCategories;

  const { fetchContentById } = useFetchContent(api);
  const fetchData = await fetchContentById(category, id);
  post.value = fetchData;
});

const { push } = useRouter();

const { updateContent } = useUpdateContent(api);
const updateEvent = async (body: any) => {
  await updateContent(category, id, body);
  push(`/${category}/${subCategory}/${id}`);
};
</script>
