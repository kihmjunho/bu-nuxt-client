<template>
  <ul class="category-list">
    <li v-for="item in props.data" :key="item.id" class="category-item">
      <NuxtLink
        class="category-link"
        :to="computedUrl(item.name)"
        :class="[item.name === props.subCategory ? 'active' : '']"
      >
        {{ item.name }}
      </NuxtLink>
    </li>
  </ul>
</template>

<script setup lang="ts">
import { Category } from '@/types/types';

const props = defineProps({
  data: Array as () => Category[],
  category: String,
  subCategory: {
    type: String,
    default: 'all',
  },
});

const computedUrl = (item: string) => {
  return item === 'all' ? `/${props.category}` : `/${props.category}/${item}`;
};
</script>

<style lang="scss">
.category {
  &-list {
    display: flex;
    text-transform: uppercase;
    gap: 16px;
    margin-bottom: 32px;
  }

  &-link {
    border-radius: 6px;
    padding: 8px;
    font-weight: bold;

    &.active {
      background: #fff;
      color: #000;
    }
  }
}
</style>
