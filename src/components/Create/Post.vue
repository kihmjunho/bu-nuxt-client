<template>
  <form
    enctype="multipart/form-data"
    class="form form--content"
    @submit.prevent="upload"
  >
    <label for="title" hidden>title</label>
    <input
      v-model="post.title"
      id="title"
      class="form__input"
      type="text"
      placeholder="title"
    />
    <select v-model="post.subCategoryId" class="form__select">
      <option class="form__select-option" :value="null">category</option>
      <option
        class="form__select-option"
        v-for="item in props.categories"
        :key="item.id"
        :value="item.id"
      >
        {{ item.name }}
      </option>
    </select>

    <textarea
      class="form__textarea"
      rows="10"
      placeholder="description"
      v-model="post.description"
    />

    <textarea
      class="form__textarea"
      rows="4"
      placeholder="meta description"
      v-model="post.metaDescription"
    />

    <ImagesInput @emitImages="imagesInput" />
    <ImagesPreview :data="previewFiles" @emitRemove="removeImage" />

    <button class="form__button" type="submit">create {{ props.type }}</button>
  </form>
</template>

<script setup lang="ts">
import _ from 'lodash';

const props = defineProps({ categories: Object, type: String });

const post = reactive({
  title: '',
  subCategoryId: null,
  description: '',
  metaDescription: '',
});

const uploadFiles = ref([]);
const previewFiles = ref([]);

const imagesInput = (data: any) => {
  uploadFiles.value = data.uploadFiles;
  previewFiles.value = data.previewFiles;
};

const emit = defineEmits(['emitUpload']);

const upload = async () => {
  const { wrapTextInPTag } = useParagraph();

  const formData = new FormData();

  const postData = {
    title: post.title,
    description: wrapTextInPTag(post.description),
    metaDescription: post.metaDescription,
    categoryId: 4,
    subCategoryId: post.subCategoryId,
  };

  _.forEach(uploadFiles.value, (file: any) => {
    formData.append('images', file);
  });

  emit('emitUpload', { postData, formData });
};

const removeImage = (index: any) => {
  uploadFiles.value.splice(index, 1);
  previewFiles.value.splice(index, 1);
};
</script>
