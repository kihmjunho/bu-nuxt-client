<template>
  <ul class="post-control">
    <li class="post-control__item">
      <NuxtLink
        class="post-control__link"
        :to="`/${category}/${subCategory}/${id}/update`"
      >
        수정
      </NuxtLink>
    </li>
    <li class="post-control__item">
      <NuxtLink
        class="post-control__link"
        :to="`/${category}/${subCategory}/${id}/images`"
      >
        이미지 수정
      </NuxtLink>
    </li>
    <li class="post-control__item">
      <NuxtLink
        class="post-control__link"
        :to="`/${category}/${subCategory}/${id}/delete`"
      >
        삭제
      </NuxtLink>
    </li>
  </ul>
</template>

<script setup lang="ts">
const props = defineProps({
  category: String,
  subCategory: String,
  id: String,
});
</script>
