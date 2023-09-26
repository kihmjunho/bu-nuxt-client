<template>
  <form
    enctype="multipart/form-data"
    class="form form--content"
    @submit.prevent="upload"
  >
    <label for="title" hidden>title</label>
    <input
      v-model="title"
      id="title"
      class="form__input"
      type="text"
      placeholder="title"
    />
    <select v-model="subCategoryId" class="form__select">
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
      v-model="description"
    />

    <template v-if="props.type === 'artwork'">
      <input
        class="form__input"
        type="text"
        placeholder="width"
        v-model="width"
      />
      <input
        class="form__input"
        type="text"
        placeholder="height"
        v-model="height"
      />
      <input
        class="form__input"
        type="text"
        placeholder="materials"
        v-model="materials"
      />
      <input
        class="form__input"
        type="number"
        placeholder="year"
        v-model="year"
      />
      <input
        class="form__input"
        type="number"
        placeholder="price"
        v-model="price"
      />
      <input
        class="form__input"
        type="text"
        placeholder="collector"
        v-model="collector"
      />
    </template>
    <template v-if="props.type === 'exhibition'">
      <input
        class="form__input"
        type="number"
        placeholder="year"
        v-model="year"
      />
      <input
        class="form__input"
        type="text"
        placeholder="date"
        v-model="date"
      />
    </template>
    <template v-if="props.type === 'post'">
      <textarea
        class="form__textarea"
        rows="4"
        placeholder="meta description"
        v-model="metaText"
      />
    </template>

    <ImagesInput @emitImages="imagesInput" />
    <ImagesPreview :data="previewFiles" @emitRemove="removeImage" />

    <button class="form__button" type="submit">create {{ props.type }}</button>
  </form>
</template>

<script setup lang="ts">
import _ from 'lodash';

const props = defineProps({ categories: Object, type: String });

const title = ref('');
const subCategoryId = ref(null);
const metaText = ref('');
const description = ref('');
const width = ref(null);
const height = ref(null);
const materials = ref('');
const year = ref(null);
const price = ref(null);
const collector = ref('');
const date = ref('');
const uploadFiles = ref([]);
const previewFiles = ref([]);

const imagesInput = (data: any) => {
  uploadFiles.value = data.uploadFiles;
  previewFiles.value = data.previewFiles;
};

const emit = defineEmits(['emitUpload']);

const categoryId =
  props.type === 'artwork' ? 2 : props.type === 'exhibition' ? 3 : 4;

const upload = async () => {
  const { paragraph } = useParagraph(description.value);

  const formData = new FormData();

  const emitData = {
    title: title.value,
    description: paragraph,
    width: width.value,
    height: height.value,
    materials: materials.value,
    year: year.value,
    price: price.value,
    date: date.value,
    collector: collector.value,
    metaDescription: metaText.value,
    categoryId: categoryId,
    subCategoryId: subCategoryId.value,
    userId: useCookie('buUserId').value,
  };

  _.forEach(uploadFiles.value, (file: any) => {
    formData.append('images', file);
  });

  emit('emitUpload', { emitData, formData });
};

const removeImage = (index: any) => {
  uploadFiles.value.splice(index, 1);
  previewFiles.value.splice(index, 1);
};
</script>
