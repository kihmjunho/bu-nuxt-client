<template>
  <ul class="section__list" :class="changeClass(props.category)">
    <slot />
  </ul>
</template>

<script setup lang="ts">
const props = defineProps({
  category: {
    type: String,
    required: true,
  },
});

const changeClass = (name: string) => {
  return name === 'exhibition' ? 'grid--two' : 'grid--three';
};
</script>
