<template>
  <ul class="post__control">
    <li class="post__control-item">
      <NuxtLink
        class="post__control-link"
        :to="`/${category}/${subCategory}/${id}/update`"
      >
        UPDATE
      </NuxtLink>
    </li>
    <li class="post__control-item">
      <NuxtLink
        class="post__control-link"
        :to="`/${category}/${subCategory}/${id}/images`"
      >
        IMAGES
      </NuxtLink>
    </li>
    <li class="post__control-item">
      <NuxtLink
        class="post__control-link"
        :to="`/${category}/${subCategory}/${id}/delete`"
      >
        DELETE
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
