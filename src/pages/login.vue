<template>
  <Head>
    <Title>Login</Title>
    <Meta name="description" content="Login page of body undefined" />
    <Meta property="og:description" content="Login page of body undefined" />
    <Meta property="og:image" :content="`${api}static/cover.jpg`" />
  </Head>

  <Section>
    <SectionTitle>login</SectionTitle>
    <UserLogin @emitLogin="LoginEvent" />
  </Section>
</template>

<script setup lang="ts">
import { useUserStore } from '@/stores/user';

const { api } = useRuntimeConfig().public;

const { push } = useRouter();

const LoginEvent = async (body: any) => {
  // const config = ;
  const data = await $fetch(`${api}users/login`, { method: 'post', body });

  const userStore = useUserStore();
  userStore.setUser(data);
  // console.log(data);

  push('/');
};
</script>
