<template>
  <h1 v-if="!props.data.width" class="post__title">{{ props.data.title }}</h1>

  <img class="post__image" :src="props.data.thumbnail" alt="" />

  <h1 v-if="props.data.width" class="post__caption">{{ artworkCaption }}</h1>

  <div class="post__exhibition" v-if="props.data.location">
    <div class="post__location">{{ props.data.location }}</div>
    <div class="post__period">{{ exhibitionInformation }}</div>
  </div>

  <div class="post__text" v-html="props.data.description" />

  <div v-if="props.data.images" v-for="img in props.data.images">
    <img class="post__image" :src="img.url" alt="" />
  </div>
</template>

<script setup lang="ts">
const props = defineProps({ data: { type: Object, required: true } });

const artworkCaption = computed(() => {
  const { title, width, height, materials, year } = props.data;
  return `<${title}>, ${width} * ${height} cm, ${materials}, ${year}`;
});

const exhibitionInformation = computed(() => {
  const { year, start, end } = props.data;
  return `${year}. ${start} - ${end}`;
});
</script>
