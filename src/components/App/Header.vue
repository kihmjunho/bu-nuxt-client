<template>
  <header class="header">
    <h1 class="header__title">
      <NuxtLink class="header__link" @click="closeDrawer" to="/">
        BODY UNDEFINED
      </NuxtLink>
    </h1>

    <button
      class="header__button"
      @click="toggleDrawer"
      :class="{ reverse: drawerState }"
    >
      <img src="../../static/arrow.svg" alt="" class="header__button-arrow" />
    </button>

    <div
      class="header__nav"
      :class="{ active: drawerState }"
      @click="toggleDrawer"
    >
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

const drawerState = ref(false);
const toggleDrawer = () => (drawerState.value = !drawerState.value);
const closeDrawer = () => (drawerState.value = false);
const generateUrl = (item: string) => {
  return item === 'my page' ? '/mypage' : `/${item}`;
};
</script>
