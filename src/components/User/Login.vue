<template>
  <form class="form form--user" @submit.prevent="loginEvent">
    <label for="email" hidden>email</label>
    <input
      class="form__input"
      id="email"
      v-model="email"
      type="text"
      placeholder="email"
    />
    <label for="password" hidden>pasword</label>
    <input
      class="form__input"
      id="password"
      v-model="password"
      type="password"
      placeholder="password"
      autocomplete="on"
    />

    <button class="form__button" type="submit">LOGIN</button>
  </form>
</template>

<script setup lang="ts">
const email = ref('');
const password = ref('');

const emit = defineEmits(['emitLogin']);
const loginEvent = () => {
  emit('emitLogin', {
    email: email.value,
    password: password.value,
  });

  email.value = '';
  password.value = '';
};
</script>
