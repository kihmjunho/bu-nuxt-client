<template>
  <template v-if="item">
    <Head>
      <Title>{{ item.title }}</Title>
      <!-- <Meta name="description" :content="item.metaText" />
          <Meta property="og:description" :content="item.metaText" /> -->
      <Meta property="og:image" :content="item.thumbnail" />
    </Head>
    <div class="post">
      <PostDetail :data="item" />

      <PostControl :category="category" :subCategory="subCategory" :id="id" />

      <div class="post__comment">
        <PostCommentForm @emitCreate="createComment" />

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
      </div>

      <!-- v-if="isLogin && isOwner" -->
      <!--   <template v-if="item.title">
      
          </template>
          <div v-else>not found</div>-->
    </div>
  </template>
</template>

<script setup lang="ts">
import { ContentDetail, Params } from '@/types/types';

import { useUserStore } from '@/stores/user';
import { storeToRefs } from 'pinia';

const userStore = useUserStore();
const { isLogin, isOwner, userId } = storeToRefs(userStore);
const { api } = useRuntimeConfig().public;

const params = useRoute().params as unknown;
const { category, subCategory, id } = params as Params;
// const { push } = useRouter();

const { data: item } = useAsyncData<ContentDetail>('item', async () => {
  return await $fetch(`${api}creations/${category}s/${id}`, {
    headers: {
      authentication: useCookie('buToken').value || '',
    },
  });
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

// const deletePost = async () => {
//   await $fetch(`${postApi}`, { method: 'delete' });
//   push('/');
// };
</script>
