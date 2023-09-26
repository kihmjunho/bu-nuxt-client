<template>
  <AppHeader :categories="categories" :user="user" :isLogin="isLogin" />

  <AppCover v-if="useRoute().name === 'index'" />
  <div v-else class="header__bg" />

  <div class="main">
    <div class="inner">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import { type Category } from '@/types/types';

const { api } = useRuntimeConfig().public;

const user = {
  before: ['login', 'signup'],
  after: ['create', 'my page', 'logout'],
};

const categories = ref([] as Category[]);
onMounted(async () => {
  const { fetchMainCategories } = await useFetchCategories(api);
  const data: Category[] = await fetchMainCategories();
  categories.value = data;
});

import { useUserStore } from '@/stores/user';
import { storeToRefs } from 'pinia';

const userStore = useUserStore();
const { isLogin, isOwner } = storeToRefs(userStore);
if (useCookie('buToken').value) userStore.getCookies();
</script>

<style lang="scss">
//
</style>
