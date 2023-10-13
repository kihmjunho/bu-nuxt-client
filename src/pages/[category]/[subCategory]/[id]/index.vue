<template>
  <template v-if="post">
    <Head>
      <Title>{{ post.title }}</Title>
      <Meta name="description" :content="metaDescription" />
      <Meta property="og:description" :content="metaDescription" />
      <Meta property="og:image" :content="post.thumbnail" />
    </Head>

    <div class="post">
      <PostDetail :data="post" />

      <PostControl
        v-if="post.userId === userId"
        :category="category"
        :subCategory="subCategory"
        :id="id"
      />

      <div class="post__comment">
        <PostCommentForm v-if="isLogin" @submitCommentEvent="createComment" />

        <PostCommentList>
          <PostCommentItem
            v-for="item in comments"
            :key="item.id"
            :data="item"
            :userId="userId"
            @emitCreate="updateComment"
            @emitReply="createReply"
            @emitUpdateReply="updateComment"
            @emitDeleteComment="deleteComment"
            @emitDeleteReply="deleteComment"
          />
        </PostCommentList>
      </div>
    </div>
  </template>
</template>

<script setup lang="ts">
import { ContentDetail, Params } from '@/types/types';

const { api } = useRuntimeConfig().public;

import { useUserStore } from '@/stores/user';
import { storeToRefs } from 'pinia';

const userStore = useUserStore();
const { isLogin, userId } = storeToRefs(userStore);

const params = useRoute().params as unknown;
const { category, subCategory, id } = params as Params;

const { data: post } = useAsyncData<ContentDetail>('post', async () => {
  return await $fetch(`${api}creations/${category}s/${id}`, {
    headers: {
      authentication: useCookie('buToken').value || '',
    },
  });
});

const metaDescription = computed(() => {
  if (post.value && category === 'artwork') {
    return `Artwork for ${post.value.title}`;
  }

  if (post.value && category === 'exhibition') {
    return `Exhibition for ${post.value.title}`;
  }

  if (post.value && category === 'post') {
    return post.value.metaDescription;
  }
});

const comments = ref<any>([]);
const getComments = async () => {
  const response = await $fetch(`${api}comments?content-id=${id}`);
  comments.value = response;
};

onMounted(() => getComments());

const createComment = async (comment: any) => {
  await $fetch(`${api}comments`, {
    method: 'post',
    body: {
      comment: comment,
      contentId: id,
    },
    headers: {
      Authorization: `Bearer ${useCookie('buToken').value}` || '',
    },
  });

  getComments();
};

const updateComment = async (data: any) => {
  const { id: commentId, paragraph } = data;
  await $fetch(`${api}comments`, {
    method: 'put',
    body: { commentId, comment: paragraph },
    headers: {
      Authorization: `Bearer ${useCookie('buToken').value}` || '',
    },
  });

  getComments();
};

const createReply = async (data: any) => {
  await $fetch(`${api}comments`, {
    method: 'post',
    body: {
      comment: data.paragraph,
      commentParentId: data.id,
      contentId: id,
    },
    headers: {
      Authorization: `Bearer ${useCookie('buToken').value}` || '',
    },
  });

  getComments();
};

const deleteComment = async (id: any) => {
  await $fetch(`${api}comments/${id}`, {
    method: 'delete',
    headers: {
      Authorization: `Bearer ${useCookie('buToken').value}` || '',
    },
  });

  getComments();
};
</script>
