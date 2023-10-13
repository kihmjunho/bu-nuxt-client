<template>
  <Section>
    <SectionTitle>guestbook</SectionTitle>
    <div class="guest">
      <GuestbookForm v-if="isLogin" @submitGuestEvent="createGuestbookEvent" />

      <GuestbookList>
        <GuestbookItem
          v-for="item in guestbook"
          :key="item.id"
          :data="item"
          :userId="userId"
          @emitUpdate="updateGuestMessage"
          @emitReply="createGuestbookEvent"
          @emitUpdateReply="updateGuestMessage"
          @emitDeleteComment="deleteGuestbookMessage"
        />
      </GuestbookList>
    </div>
  </Section>
</template>

<script setup lang="ts">
const { api } = useRuntimeConfig().public;

import { useUserStore } from '@/stores/user';
import { storeToRefs } from 'pinia';

const userStore = useUserStore();
const { isLogin, userId } = storeToRefs(userStore);

const guestbook = ref<any[]>([]);

const { getGuestbook, createGuestbook, updateGuestbook, deleteGuestbook } =
  useGuestbook(api);

const getGuestbookData = async () => {
  const data = await getGuestbook();
  guestbook.value = data;
};

onMounted(async () => {
  getGuestbookData();
});

const createGuestbookEvent = async (message: any) => {
  await createGuestbook(message);
  getGuestbookData();
};

const updateGuestMessage = async (message: any) => {
  await updateGuestbook(message);
  getGuestbookData();
};

const deleteGuestbookMessage = async (id: any) => {
  await deleteGuestbook(id);
  getGuestbookData();
};
</script>
