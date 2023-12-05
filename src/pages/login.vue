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
  login
  <Section>
    <SectionTitle>login</SectionTitle>
    <UserLogin @emitLogin="loginEvent" :error="renderError" />
  </Section>
</template>

<script setup lang="ts">
import { useUserStore } from '@/stores/user';

import { type SubmitUser } from '@/types/types';

const { api } = useRuntimeConfig().public;
const { push } = useRouter();

const { loginUser, getUserData } = useUser(api);
const renderError = ref('');

const loginEvent = async (body: SubmitUser) => {
  const { accessToken, errorMessage } = await loginUser(body);

  if (accessToken) {
    console.log(accessToken);

    useCookie('buToken').value = accessToken;
    const data = await getUserData(accessToken);

    const userStore = useUserStore();
    userStore.setUser(data);
    push('/');
  }

  if (errorMessage) {
    renderError.value = errorMessage;
  }
};
</script>
