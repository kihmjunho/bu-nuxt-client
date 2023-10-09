<template>
  <ContentList
    :title="category"
    :data="list"
    :categories="computedCategories"
    :category="category"
  />
  <div ref="target" v-if="show" class="target" />
</template>

<script setup lang="ts">
import { useIntersectionObserver } from '@vueuse/core';
import { Category, Content, Contents, Params } from '@/types/types';

const { api } = useRuntimeConfig().public;

const params = useRoute().params as unknown;
const { category } = params as Params;

const categories = ref<Category[]>([]);
const list = ref<Content[]>([]);

const idx = ref(1);
const totalPages = ref(0);
const target = ref(null);
const show = ref(false);

const getContents = async () => {
  const { fetchByCategory } = useFetchBy(api);
  const data: Contents = await fetchByCategory(category, 6, idx.value);

  if (totalPages.value === 0) {
    totalPages.value = data.totalPages;
    show.value = true;
  }

  list.value = [...list.value, ...data.data];
  totalPages.value = totalPages.value - 1;
};

onMounted(async () => {
  const { fetchSubCategories } = useFetchCategories(api);
  const data: Category[] = await fetchSubCategories(category);
  categories.value = data;

  getContents();
});

const computedCategories = computed(() => {
  return [{ id: 0, name: 'all' }, ...categories.value];
});

const moreEvent = () => {
  idx.value++;
  getContents();
};

useIntersectionObserver(target, ([{ isIntersecting }]) => {
  if (isIntersecting) {
    if (totalPages.value === 0) {
      show.value = false;
      return;
    }
    
    moreEvent();
  }
});
</script>
