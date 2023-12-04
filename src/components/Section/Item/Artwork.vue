<template>
  <li class="content-post">
    <NuxtLink :to="createUrl(props.data)" class="artwork">
      <div class="artwork__thumbnail">
        <img
          class="artwork__image"
          :src="props.data.thumbnail"
          :alt="props.data.title"
        />
      </div>
    </NuxtLink>
  </li>
</template>

<script setup lang="ts">
import { type Content } from '@/types/types';

const props = defineProps({
  data: {
    type: Object as PropType<Content>,
    required: true,
  },
});

const { createUrl } = useCreateString();
</script>

<style lang="scss">
.artwork {
  width: 362px;

  &__thumbnail {
    position: relative;
    width: inherit;
    height: 362px;
    background: center/cover no-repeat;
    margin-bottom: 8px;
  }

  &__image {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}

@media screen and (max-width: 1200px) {
  .artwork {
    width: 30vw;

    &__thumbnail {
      height: 30vw;
    }
  }
}

@media screen and (max-width: 1050px) {
  .artwork {
    width: 46.25vw;

    &__thumbnail {
      height: 46.25vw;
    }
  }
}

@media screen and (max-width: 700px) {
  .artwork {
    width: 100vw;

    &__thumbnail {
      height: 100vw;
    }
  }
}
</style>
