<template>
  <Head>
    <Title>Signup</Title>
    <Meta name="description" content="Signup page of body undefined" />
    <Meta property="og:description" content="Signup page of body undefined" />
    <Meta
      property="og:image"
      content="https://buimages.s3.ap-northeast-2.amazonaws.com/cover.jpg"
    />
  </Head>

  <Section>
    <SectionTitle>signup</SectionTitle>
    <UserSignup
      :error="renderError"
      @submitUserData="signupEvent"
      @clearErrorMessage="clearErrorMessage"
    />
  </Section>
</template>

<script setup lang="ts">
import { SubmitUser } from '@/types/types';

const { api } = useRuntimeConfig().public;
const { push } = useRouter();

const { signupUser } = useUser(api);
const renderError = ref('');
const clearErrorMessage = () => (renderError.value = '');

const signupEvent = async (body: SubmitUser) => {
  const { errorMessage } = await signupUser(body);

  if (errorMessage) {
    renderError.value = errorMessage;
  } else {
    push('/login');
  }
};
</script>
