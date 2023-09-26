<template>
  <ContentList
    :title="category"
    :data="list"
    :categories="computedCategories"
    :category="category"
    :subCategory="subCategory"
  />
</template>

<script setup lang="ts">
import { Category, Content, Contents, Params } from '@/types/types';

const { api } = useRuntimeConfig().public;

const params = useRoute().params as unknown;
const { category, subCategory } = params as Params;

const categories = ref<Category[]>([]);
const list = ref<Content[]>([]);

onMounted(async () => {
  const limit = 6;
  const page = 1;

  const { fetchSubCategories } = useFetchCategories(api);
  const data: Category[] = await fetchSubCategories(category);
  categories.value = data;

  const { fetchContentBySubCategory } = useFetchContent(api);
  const items: any = await fetchContentBySubCategory(subCategory, limit, page);
  list.value = items.data;
});

const computedCategories = computed(() => {
  return [{ id: 0, name: 'all' }, ...categories.value];
});
</script>
