<template>
  <div>logout</div>
</template>

<script setup lang="ts">
import { useUserStore } from '@/stores/user';

const userStore = useUserStore();

onMounted(() => {
  userStore.logoutUser();
  useRouter().push('/');
});
</script>
