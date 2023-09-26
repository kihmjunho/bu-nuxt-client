<template>
  <li class="content-post">
    <NuxtLink
      :to="`/post/${props.data.subCategory}/${props.data.id}`"
      class="boardLink"
    >
      <div
        class="boardLink__thumbnail"
        :style="`background-image: url('${props.data.thumbnail}')`"
      >
        <span class="boardLink__thumbnail-category">{{
          props.data.subCategory
        }}</span>
      </div>
      <div class="boardLink__text">
        <p class="boardLink__text-title">
          {{ props.data.title }}
        </p>
        <p class="boardLink__text-description">
          <!-- {{ data.description.split('[//]')[0] }} -->
        </p>
      </div>
    </NuxtLink>
  </li>
</template>
<script setup lang="ts">
import { Content } from '@/types/types';

const props = defineProps({
  data: { type: Object as () => Content, required: true },
});

const { createUrl } = useCreateString();
</script>

<style lang="scss">
.board__thumbnail {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.boardLink {
  display: block;
  background: #000;
  width: 362px;
  height: 100%;

  &__thumbnail {
    position: relative;
    width: 100%;
    height: 217.2px;
    background: center/cover no-repeat;

    &:after {
      content: '';
      display: block;
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      background: linear-gradient(transparent, #000 100%);
    }

    &-category {
      position: absolute;
      left: 8px;
      top: 8px;
      padding: 4px;
      background: #000;
      text-transform: uppercase;
      font-size: 14px;
    }
  }

  &__text {
    margin: 16px;

    &-title {
      margin-bottom: 16px;
      position: relative;
      top: -24px;
      font-size: 20px;
    }

    &-description {
      font-size: 16px;
    }
  }
}

@media screen and (max-width: 1200px) {
  .boardLink {
    width: 30vw;

    &__thumbnail {
      width: 100%;
      height: 18vw;
    }
  }
}

@media screen and (max-width: 1050px) {
  .boardLink {
    width: 46.5vw;

    &__thumbnail {
      height: 27.9vw;
    }
  }
}

@media screen and (max-width: 700px) {
  .boardLink {
    width: 100vw;

    &__thumbnail {
      height: 60vw;
    }
  }
}
</style>
