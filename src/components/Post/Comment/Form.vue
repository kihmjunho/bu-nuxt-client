<template>
  <form class="post__comment-form" @submit.prevent="createCommentEvent">
    <textarea class="post__comment-textarea" v-model="comment" />
    <button class="post__comment-submit" type="submit">add comment</button>
  </form>
</template>

<script setup lang="ts">
const comment = ref('');

const emit = defineEmits<{
  (e: 'submitCommentEvent', paragraph: string): void;
}>();

const createCommentEvent = () => {
  const { wrapTextInPTag } = useParagraph();
  const paragraph = wrapTextInPTag(comment.value);
  emit('submitCommentEvent', paragraph);
  comment.value = '';
};
</script>
