<template>
  <header class="header">
    <h1 class="header__title">
      <NuxtLink class="header__link" to="/">BODY UNDEFINED</NuxtLink>
    </h1>

    <div class="header__nav">
      <ul class="header__list list--content">
        <li
          class="header__item"
          v-for="item in props.categories"
          :key="item.id"
        >
          <NuxtLink :to="generateUrl(item.name)">{{ item.name }}</NuxtLink>
        </li>
      </ul>
      <ul class="header__list list--control">
        <li
          class="header__item"
          v-if="!isLogin"
          v-for="item in props.user?.before"
          :key="item"
        >
          <NuxtLink :to="generateUrl(item)">{{ item }}</NuxtLink>
        </li>
        <li
          class="header__item"
          v-else
          v-for="(item, index) in props.user?.after"
          :key="index"
        >
          <NuxtLink :to="generateUrl(item)">{{ item }}</NuxtLink>
        </li>
      </ul>
    </div>
  </header>
</template>

<script setup lang="ts">
const props = defineProps({
  categories: Object,
  user: Object,
  isLogin: Boolean,
});

const generateUrl = (item: string) => {
  return item === 'my page' ? '/mypage' : `/${item}`;
};
</script>
