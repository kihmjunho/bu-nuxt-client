<template>
  <ContentList
    :title="category"
    :data="list"
    :categories="computedCategories"
    :category="category"
  />
</template>

<script setup lang="ts">
import { Category, Content, Contents, Params } from '@/types/types';

const { api } = useRuntimeConfig().public;

const params = useRoute().params as unknown;
const { category } = params as Params;

const categories = ref<Category[]>([]);
const list = ref<Content[]>([]);

onMounted(async () => {
  const limit = 6;
  const page = 1;

  const { fetchSubCategories } = useFetchCategories(api);
  const data: Category[] = await fetchSubCategories(category);
  categories.value = data;

  const { fetchContentByCategory } = useFetchContent(api);
  const items: Contents = await fetchContentByCategory(category, limit, page);
  list.value = items.data;
});

const computedCategories = computed(() => {
  return [{ id: 0, name: 'all' }, ...categories.value];
});
</script>
