<template>
  <ul class="preview">
    <li v-for="(file, index) in props.data" :key="index" class="preview__item">
      <img class="preview__image" :src="`${file.url}`" alt />
      <button class="preview__button" @click.prevent="removeItem(index)">
        X
      </button>
    </li>
  </ul>
</template>

<script setup lang="ts">
const props = defineProps({ data: Array });

const emit = defineEmits(['emitRemove']);
const removeItem = (index) => emit('emitRemove', index);
</script>

<style lang="scss">
.preview {
  margin: 24px auto;

  &__image {
    width: auto;
    height: auto;
    max-width: 500px;
    max-height: 500px;
  }

  &__button {
    position: relative;
    top: -16px;
    padding: 0 12px;
    background: #000;
    border: 1px solid #fff;
    font-size: 32px;
  }
}
</style>
