<template>
  <div>delete</div>
</template>

<script setup lang="ts">
import { Params } from '~/types/types';
const { api } = useRuntimeConfig().public;

const params = useRoute().params as unknown;
const { category, subCategory, id } = params as Params;
const { deleteContent } = useContent(api);

onMounted(() => {
  deleteContent(id, category);
});
</script>

<style scoped></style>
