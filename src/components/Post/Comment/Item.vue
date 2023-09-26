<template>
  <li class="post__comment-item">
    <div class="post__comment-header">
      <div class="post__comment-information">
        {{ props.data.nickname }} | {{ props.data.createdAt }}
      </div>
      <div v-if="props.data.userId === props.userId">
        <button @click="showForm">update</button>
      </div>
    </div>
    <div v-if="showComment">
      <p v-html="props.data.comment" />

      <button @click="showReply">reply</button>
    </div>
    <form v-else class="message__form" @submit.prevent="updateComment">
      <textarea class="message__textarea" v-model="comment" />
      <button class="message__button" type="submit">update comment</button>
    </form>
    <form v-if="replyForm" @submit.prevent="createReply">
      <textarea class="message__textarea" v-model="reply" />
      <button class="message__button" type="submit">create reply</button>
    </form>
    <ul>
      <PostCommentReply
        style="padding-left: 32px"
        v-for="item in props.data.replies"
        :key="item.id"
        :data="item"
      />
    </ul>
  </li>
</template>

<script setup lang="ts">
const showComment = ref(true);
const replyForm = ref(false);
const comment = ref('');
const reply = ref('');

const props = defineProps({
  data: { type: Object as () => any, required: true },
  userId: { type: String, required: true },
});

const showForm = () => {
  showComment.value = !showComment.value;
  comment.value = props.data.comment;
};

const showReply = () => {
  replyForm.value = true;
};
// const emit = defineEmits<{
//   (e: 'emitCreate', { paragraph: string, id: string }): void;
// }>();

const emit = defineEmits(['emitCreate', 'emitReply']);
const updateComment = () => {
  const { paragraph } = useParagraph(comment.value);
  emit('emitCreate', { paragraph, id: props.data.id });
  comment.value = '';
};

const createReply = () => {
  const { paragraph } = useParagraph(reply.value);
  emit('emitReply', { paragraph, id: props.data.id });
  replyForm.value = false;
  reply.value = '';
  // console.log(paragraph);
};
</script>
