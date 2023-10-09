<template>
  <form
    enctype="multipart/form-data"
    class="form form--content"
    @submit.prevent="submitArtworkData"
  >
    <label for="title" hidden>title</label>
    <input
      v-model="artwork.title"
      id="title"
      class="form__input"
      type="text"
      placeholder="title"
    />
    <select v-model="artwork.subCategoryId" class="form__select">
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
      v-model="artwork.description"
    />

    <input
      class="form__input"
      type="text"
      placeholder="width"
      v-model="artwork.width"
    />
    <input
      class="form__input"
      type="text"
      placeholder="height"
      v-model="artwork.height"
    />
    <input
      class="form__input"
      type="text"
      placeholder="materials"
      v-model="artwork.materials"
    />
    <input
      class="form__input"
      type="number"
      placeholder="year"
      v-model="artwork.year"
    />
    <input
      class="form__input"
      type="number"
      placeholder="price"
      v-model="artwork.price"
    />
    <input
      class="form__input"
      type="text"
      placeholder="collector"
      v-model="artwork.collector"
    />

    <ImagesInput @emitImages="imagesInput" />
    <ImagesPreview :data="previewFiles" @emitRemove="removeImage" />

    <button class="form__button" type="submit">create artwork</button>
  </form>
</template>

<script setup lang="ts">
import _ from 'lodash';

const props = defineProps({ categories: Object });

const artwork = reactive({
  title: '',
  subCategoryId: null,
  description: '',
  width: null,
  height: null,
  materials: '',
  year: null,
  price: null,
  collector: null,
});

const uploadFiles = ref([]);
const previewFiles = ref([]);

const imagesInput = (data: any) => {
  uploadFiles.value = data.uploadFiles;
  previewFiles.value = data.previewFiles;
};

const emit = defineEmits<{
  (e: 'emitArtworkData', value: any): void;
}>();



const submitArtworkData = () => {
  const { wrapTextInPTag } = useParagraph();

  const artworkData = {
    title: artwork.title,
    description: wrapTextInPTag(artwork.description),
    width: artwork.width,
    height: artwork.height,
    materials: artwork.materials,
    year: artwork.year,
    price: artwork.price,
    collector: artwork.collector,
    categoryId:2,
    subCategoryId: artwork.subCategoryId,
  };

  const formData: FormData = new FormData();
  _.forEach(uploadFiles.value, (file: any) => {
    formData.append('images', file);
  });

  emit('emitArtworkData', { artworkData, formData });
};

const removeImage = (index: any) => {
  uploadFiles.value.splice(index, 1);
  previewFiles.value.splice(index, 1);
};
</script>
