<template>
  <li
    class="content-exhibition"
    :style="{
      'background-image': `url('${data.thumbnail}')`,
    }"
  >
    <NuxtLink class="exhibition" :to="createUrl(props.data)">
      <p class="exhibition__title">
        {{ data.title }}
      </p>
    </NuxtLink>
  </li>
</template>

<script setup lang="ts">
import { type Content } from '@/types/types';

const props = defineProps({
  data: { type: Object as () => Content, required: true },
});

const { createUrl } = useCreateString();
</script>

<style lang="scss">
.exhibition {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  &:after {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    background: #000;
    opacity: 0.7;
  }

  &__title {
    font-size: 24px;
    color: #fff;
    z-index: 1;
  }
}
</style>
