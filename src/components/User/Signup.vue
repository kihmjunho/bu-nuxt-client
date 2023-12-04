<template>
  <form class="form form--user" @submit.prevent="signupEvent">
    <label for="email" hidden>email</label>
    <input
      class="form__input"
      id="email"
      v-model="user.email"
      type="text"
      placeholder="email"
      autocomplete="off"
    />

    <label for="password" hidden>pasword</label>
    <input
      class="form__input"
      id="password"
      v-model="user.password"
      type="password"
      autocomplete="off"
      placeholder="password"
    />

    <label for="password" hidden>confirm_password</label>
    <input
      class="form__input"
      id="confirm_pasword"
      v-model="user.confirmPassword"
      type="password"
      autocomplete="off"
      placeholder="confirm password"
    />

    <div v-if="props.error" class="form__message">
      {{ props.error }}
    </div>

    <div v-if="passwordMismatchWarning" class="form__message">
      The passwords do not match. Please try again.
    </div>

    <button class="form__button">SIGNUP</button>
  </form>
</template>

<script setup lang="ts">
const props = defineProps({ error: String });

const user = reactive({
  email: '',
  password: '',
  confirmPassword: '',
});

const emit = defineEmits<{
  (e: 'submitUserData', value: any): void;
  (e: 'clearErrorMessage'): void;
}>();

const passwordMismatchWarning = ref(false);

const signupEvent = () => {
  emit('clearErrorMessage');

  if (user.password !== user.confirmPassword) {
    return (passwordMismatchWarning.value = true);
  } else {
    passwordMismatchWarning.value = false;
  }

  emit('submitUserData', {
    email: user.email,
    password: user.password,
    nickname: user.email.split('@')[0],
  });

  if (user.email && user.password) {
    user.email = '';
    user.password = '';
    user.confirmPassword = '';
  }
};
</script>
