<template>
  <ul class="section__tab">
    <li v-for="item in props.data" :key="item.id" class="section__tab-item">
      <NuxtLink
        class="section__tab-link"
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
  data: Array as PropType<Category[]>,
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
.section {
  &__tab {
    display: flex;
    text-transform: uppercase;
    gap: 16px;
    margin-bottom: 32px;

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
}

@media screen and (max-width: 640px) {
  .section {
    &__tab {
      padding: 0 16px;
    }
  }
}
</style>
