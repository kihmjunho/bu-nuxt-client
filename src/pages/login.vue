<template>
  <Head>
    <Title>Login</Title>
    <Meta name="description" content="Login page of body undefined" />
    <Meta property="og:description" content="Login page of body undefined" />
    <Meta
      property="og:image"
      content="https://buimages.s3.ap-northeast-2.amazonaws.com/cover.jpg"
    />
  </Head>

  <Section>
    <SectionTitle>login</SectionTitle>
    <UserLogin @emitLogin="loginEvent" />
  </Section>
</template>

<script setup lang="ts">
import { useUserStore } from '@/stores/user';

const { api } = useRuntimeConfig().public;

const { push } = useRouter();

const loginEvent = async (body: any) => {
  const data = await $fetch(`${api}users/login`, { method: 'post', body });

  const userStore = useUserStore();
  userStore.setUser(data);

  push('/');
};
</script>
