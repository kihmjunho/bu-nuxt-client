<template>
  <Head>
    <Title>Login</Title>
    <Meta name="description" content="Signup page of body undefined" />
    <Meta property="og:description" content="Signup page of body undefined" />
    <!-- <Meta property="og:image" :content="`${api}static/cover.jpg`" /> -->
  </Head>

  <Section>
    <SectionTitle>signup</SectionTitle>
    <UserSignup
      @emitSignup="signupEvent"
      :result="result"
      :availability="availability"
    />
    <!-- @emitCheck="checkEvent" -->
  </Section>
</template>

<script setup lang="ts">
const { api } = useRuntimeConfig().public;

const { push } = useRouter();

const result = ref(false);
const availability = ref(false);

// const checkEvent = async body => {
//   const config = { method: 'post', body };
//   const { response } = await $fetch(`${api}user/check`, config);
//   result.value = true;
//   availability.value = response;
// };

const signupEvent = async (body: any) => {
  // if (!body.email) {
  //   return alert('Please enter your username');
  // }

  // if (!availability.value) {
  //   return alert('Please check your username');
  // }

  // if (!body.password) {
  //   return alert('Please enter your password');
  // }

  await $fetch(`${api}users/signup`, { method: 'post', body });

  push('/login');
};
</script>
