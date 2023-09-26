<template>
  <form class="form form--user">
    <div class="user-input">
      <label for="email" hidden>email</label>
      <input
        class="form__input"
        id="email"
        v-model="email"
        type="text"
        placeholder="email"
      />
      <button class="check" @click.prevent="checkEvent">CHECK</button>
    </div>

    <div v-if="result" class="form__message">
      <div v-if="result && availability">This is an available username.</div>
      <div v-if="result && !availability">Change it to something else.</div>
    </div>

    <label for="password" hidden>pasword</label>
    <input
      class="form__input"
      id="password"
      v-model="password"
      type="password"
      placeholder="password"
    />
    <label for="nickname" hidden>nickname</label>
    <input
      class="form__input"
      id="nickname"
      v-model="nickname"
      type="text"
      placeholder="nickname"
    />

    <button class="form__button" @click.prevent="signupEvent">SIGNUP</button>
  </form>
</template>

<script setup lang="ts">
const email = ref('');
const password = ref('');
const nickname = ref('');

const props = defineProps({ result: Boolean, availability: Boolean });

const emit = defineEmits(['emitCheck', 'emitSignup']);

const checkEvent = () => {
  emit('emitCheck', { email: email.value });
};

const signupEvent = () => {
  emit('emitSignup', {
    email: email.value,
    password: password.value,
    nickname: nickname.value,
  });

  if (email.value && password.value) {
    email.value = '';
    password.value = '';
  }
};
</script>

<style lang="scss">
.user-input {
  border-bottom: 1px solid #fff;
  position: relative;
  margin-bottom: 20px;
  & > .form__input {
    border: none;
    margin: 0;
    width: calc(100% - 48.94px);
  }
  .check {
    position: absolute;
    height: fit-content;
    top: 0;
    bottom: 0;
    right: 5px;
    margin: auto;
  }
}

.form__message {
  position: relative;
  top: -10px;
  padding: 5px;
  margin-bottom: 10px;
  font-size: 16px;
}
</style>
