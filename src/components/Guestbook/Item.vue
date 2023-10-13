import { values } from 'lodash'; import { identity } from 'lodash';
<template>
  <li class="post__comment-item">
    <div class="post__comment-header">
      <div class="post__comment-information">
        <div class="post__comment-writer">
          {{ props.data.user.nickname }}
        </div>
        <div class="post__comment-date">
          {{ dayjs(props.data.createdAt).format('YYYY. MM. DD.') }}
        </div>
      </div>
      <div
        class="post__comment-control"
        v-if="props.data.user.id === props.userId"
      >
        <button class="post__comment-button" @click="showForm">UPDATE</button>
        <button class="post__comment-button" @click="deleteComment">
          DELETE
        </button>
      </div>
    </div>
    <div class="post__comment-body" v-if="showComment">
      <div class="post__comment-text" v-html="props.data.message" />

      <button class="post__comment-button" @click="showReply">reply</button>
    </div>
    <form v-else class="post__comment-form" @submit.prevent="updateComment">
      <textarea class="post__comment-textarea" v-model="guestMessage" />
      <button class="post__comment-submit" type="submit">update comment</button>
    </form>
    <form
      v-if="replyForm"
      class="post__comment-form"
      @submit.prevent="replyEvent"
    >
      <textarea class="post__comment-textarea" v-model="guestMessage" />
      <button class="post__comment-submit" type="submit">create reply</button>
    </form>
    <ul>
      <GuestbookReply
        style="padding-left: 48px"
        v-for="item in props.data.children"
        :key="item.id"
        :data="item"
        :userId="userId"
        @emitUpdateReply="updateReply"
        @emitDeleteReply="deleteReply"
      />
    </ul>
  </li>
</template>

<script setup lang="ts">
import dayjs from 'dayjs';

const showComment = ref(true);
const replyForm = ref(false);
const guestMessage = ref('');
const reply = ref('');

const props = defineProps({
  data: { type: Object as () => any, required: true },
  userId: { type: String, required: true },
});
const { wrapTextInPTag, removePTagsFromHTML } = useParagraph();

const showForm = () => {
  showComment.value = !showComment.value;
  guestMessage.value = removePTagsFromHTML(props.data.message);
};

const showReply = () => {
  replyForm.value = true;
};

const emit = defineEmits([
  'emitUpdate',
  'submitReply',
  'emitUpdateReply',
  'emitDeleteComment',
  'emitDeleteReply',
]);

const updateComment = () => {
  const message = wrapTextInPTag(guestMessage.value);
  emit('emitUpdate', { message, id: props.data.id });
  guestMessage.value = '';
  showComment.value = !showComment.value;
};

const deleteComment = () => {
  emit('emitDeleteComment', props.data.id);
};

const updateReply = (message: string) => {
  emit('emitUpdateReply', message);
};

const deleteReply = (id: string) => {
  emit('emitDeleteComment', id);
};

const replyEvent = () => {
  const { id } = props.data;
  const message = wrapTextInPTag(guestMessage.value);
  emit('emitReply', { messageParentId: id, message });
  replyForm.value = false;
  guestMessage.value = '';
};
</script>
