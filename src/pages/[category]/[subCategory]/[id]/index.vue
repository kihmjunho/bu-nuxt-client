<template>
  <template v-if="item">
    <Head>
      <Title>{{ item.title }}</Title>
      <Meta name="description" :content="metaDescription" />
      <Meta property="og:description" :content="metaDescription" />
      <Meta property="og:image" :content="item.thumbnail" />
    </Head>

    <div class="post">
      <PostDetail :data="item" />

      <PostControl
        v-if="item.userId === userId"
        :category="category"
        :subCategory="subCategory"
        :id="id"
      />

      <!-- <div class="post__comment">
        <PostCommentForm v-if="isLogin" @emitCreate="createComment" />

        <PostCommentList>
          <PostCommentItem
            v-for="item in comments"
            :key="item.id"
            :data="item"
            :userId="userId"
            @emitCreate="updateComment"
            @emitReply="createReply"
          />
        </PostCommentList>
      </div> -->
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

const { data: item } = useAsyncData<ContentDetail>('item', async () => {
  return await $fetch(`${api}creations/${category}s/${id}`, {
    headers: {
      authentication: useCookie('buToken').value || '',
    },
  });
});

const metaDescription = computed(() => {
  if (item.value && category === 'artwork') {
    return `Artwork Introduction for ${item.value.title}`;
  }

  if (item.value && category === 'exhibition') {
    return `Exhibition Introduction for ${item.value.title}`;
  }

  if (item.value && category === 'post') {
    return item.value.metaDescription;
  }
});

const comments = ref<any>([]);
const getComments = async () => {
  const response = await $fetch(`${api}comment/${id}`);
  comments.value = response;
};

onMounted(() => {
  getComments();
});

const createComment = async (comment: any) => {
  await $fetch(`${api}comment/${id}`, {
    method: 'post',
    body: {
      comment: comment,
      userId: useCookie('buUserId').value,
    },
  });

  getComments();
};

const updateComment = async (data: any) => {
  console.log(data);

  //   const { id: commentId, value: comment } = data;
  //   await $fetch(`${postApi}/comments`, {
  //     method: 'put',
  //     body: { commentId, comment },
  //   });

  //   getComment();
};

const createReply = async (data: any) => {
  await $fetch(`${api}comment/${id}/reply`, {
    method: 'post',
    body: {
      reply: data.paragraph,
      commentId: data.id,
      userId: useCookie('buUserId').value,
    },
  });
  getComments();
};
// const deleteComment = async id => {
//   await $fetch(`${postApi}/comments/${id}`, { method: 'delete' });

//   getComment();
// };
</script>
