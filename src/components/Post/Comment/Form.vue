<template>
  <form class="post__comment-form" @submit.prevent="createComment">
    <textarea class="post__comment-textarea" v-model="comment" />
    <button class="post__comment-button" type="submit">add comment</button>
  </form>
</template>

<script setup lang="ts">
const comment = ref('');

const emit = defineEmits<{
  (e: 'emitCreate', paragraph: string): void;
}>();

const createComment = () => {
  const { paragraph } = useParagraph(comment.value);
  emit('emitCreate', paragraph);
  comment.value = '';
};
</script>
