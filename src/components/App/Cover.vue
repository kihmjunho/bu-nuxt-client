<template>
  <section
    class="cover"
    style="
      background-image: url('https://buimages.s3.ap-northeast-2.amazonaws.com/cover.jpg');
    "
  >
    <h2 class="cover__slogan" v-html="props.slogan" />
  </section>
</template>

<script setup lang="ts">
const props = defineProps({
  slogan: String,
});
</script>
