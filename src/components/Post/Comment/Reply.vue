<template>
  <li v-if="showReply" style="padding-left: 32px">
    <div>
      <div>{{ props.data.nickname }} | {{ props.data.createdAt }}</div>
      <div>
        <button
          v-if="props.data.userId === props.data.userId"
          @click="showForm"
          
        >
          update
        </button>
      </div>
    </div>
    <div v-html="props.data.reply" />
  </li>
  <div v-else>hhh</div>
</template>

<script setup lang="ts">
const showReply = ref(true);

const props = defineProps({
  data: { type: Object as () => any, required: true },
});

const showForm = () => {
  console.log('kk');
};
</script>
