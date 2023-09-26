<template>
  <input type="file" ref="files" @change="fileSelected" multiple />
</template>

<script setup lang="ts">
import _ from 'lodash';

const files = ref(null as any);

const uploadFiles = ref([] as any);
const previewFiles = ref([] as any);

const emit = defineEmits(['emitImages']);
const fileSelected = () => {
  uploadFiles.value = [...uploadFiles.value, ...files.value.files];
  previewFiles.value = [
    ...previewFiles.value,
    ..._.map(files.value.files, (file) => ({
      url: URL.createObjectURL(file),
    })),
  ];

  emit('emitImages', {
    uploadFiles: uploadFiles.value,
    previewFiles: previewFiles.value,
  });
};
</script>
