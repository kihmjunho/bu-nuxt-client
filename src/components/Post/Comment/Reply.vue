<template>
  <li v-if="showReply">
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
        <button class="post__comment-button" @click="showForm">DELETE</button>
      </div>
    </div>

    <div class="post__comment-body">
      <div class="post__comment-text" v-html="props.data.comment" />
    </div>
  </li>
  <form v-else class="post__comment-form" @submit.prevent="updateReply">
    <textarea class="post__comment-textarea" v-model="reply" />
    <button class="post__comment-submit" type="submit">update comment</button>
  </form>
</template>

<script setup lang="ts">
import dayjs from 'dayjs';

const showReply = ref(true);
const reply = ref('');

const props = defineProps({
  data: { type: Object as () => any, required: true },
  userId: { type: String, required: true },
});

const showForm = () => {
  reply.value = props.data.reply;
  showReply.value = false;
};

const updateReply = () => {
  console.log(reply.value);
};
</script>
