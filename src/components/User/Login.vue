<template>
  <form class="form form--user" @submit.prevent="loginEvent">
    <label for="email" hidden>email</label>
    <input
      class="form__input"
      id="email"
      v-model="user.email"
      type="text"
      placeholder="email"
    />

    <label for="password" hidden>pasword</label>
    <input
      class="form__input"
      id="password"
      v-model="user.password"
      type="password"
      placeholder="password"
      autocomplete="on"
    />

    <div v-if="props.error" class="form__message">
      {{ props.error }}
    </div>

    <button class="form__button" type="submit">LOGIN</button>
  </form>
</template>

<script setup lang="ts">
import type { SubmitUser } from '@/types/types';

const props = defineProps({ error: String });

const user = reactive({
  email: '',
  password: '',
});

interface EmitUser {
  (e: 'emitLogin', value: SubmitUser): void;
}

const emit = defineEmits<EmitUser>();

const loginEvent = () => {
  emit('emitLogin', {
    email: user.email,
    password: user.password,
  });

  user.email = '';
  user.password = '';
};
</script>
