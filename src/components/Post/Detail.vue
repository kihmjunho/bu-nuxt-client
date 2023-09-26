<template>
  <h1 v-if="!props.data.width">{{ props.data.title }}</h1>
  <img style="width: 500px" :src="props.data.thumbnail" alt="" />
  <h1 v-if="props.data.width" class="post-detail__caption">{{ caption }}</h1>
  <div v-html="props.data.description" />
  <div v-if="props.data.images" v-for="img in props.data.images">
    <img style="width: 500px" :src="img.url" alt="" />
  </div>
</template>

<script setup lang="ts">
const props = defineProps({ data: { type: Object, required: true } });

const caption = computed(() => {
  const { title, width, height, materials, year } = props.data;
  return `<${title}>, ${width} * ${height} cm, ${materials}, ${year}`;
});
</script>
