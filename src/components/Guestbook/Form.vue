<template>
  <form class="post__comment-form" @submit.prevent="createGuest">
    <textarea class="post__comment-textarea" v-model="message" />
    <button class="post__comment-submit" type="submit">add message</button>
  </form>
</template>

<script setup lang="ts">
const message = ref('');

const emit = defineEmits<{
  (e: 'submitGuestEvent', paragraph: string): void;
}>();

const createGuest = () => {
  const { wrapTextInPTag } = useParagraph();
  const paragraph = wrapTextInPTag(message.value);
  emit('submitGuestEvent', { message: paragraph });
  message.value = '';
};
</script>
