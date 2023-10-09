<template>
  <form
    enctype="multipart/form-data"
    class="form form--content"
    @submit.prevent="submitExhibitionData"
  >
    <label for="title" hidden>title</label>
    <input
      v-model="exhibition.title"
      id="title"
      class="form__input"
      type="text"
      placeholder="title"
    />
    <select v-model="exhibition.subCategoryId" class="form__select">
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
      v-model="exhibition.description"
    />

    <input
      class="form__input"
      type="text"
      placeholder="location"
      v-model="exhibition.location"
    />
    <input
      class="form__input"
      type="text"
      placeholder="city"
      v-model="exhibition.city"
    />
    <input
      class="form__input"
      type="text"
      placeholder="year"
      v-model="exhibition.year"
    />

    <input
      class="form__input"
      type="text"
      placeholder="start"
      v-model="exhibition.start"
    />
    <input
      class="form__input"
      type="text"
      placeholder="end"
      v-model="exhibition.end"
    />

    <input
      class="form__input"
      type="text"
      placeholder="prefaceTitle"
      v-model="exhibition.prefaceTitle"
    />
    <input
      class="form__input"
      type="text"
      placeholder="prefaceAuthor"
      v-model="exhibition.prefaceAuthor"
    />
    <textarea
      class="form__textarea"
      rows="10"
      placeholder="prefaceDescription"
      v-model="exhibition.prefaceDescription"
    />
    <textarea
      class="form__textarea"
      rows="5"
      placeholder="etc"
      v-model="exhibition.etc"
    />

    <ImagesInput @emitImages="imagesInput" />
    <ImagesPreview :data="previewFiles" @emitRemove="removeImage" />

    <button class="form__button" type="submit">create exhibition</button>
  </form>
</template>

<script setup lang="ts">
import _ from 'lodash';

const props = defineProps({ categories: Object });

const exhibition = reactive({
  title: '',
  subCategoryId: null,
  description: '',
  location: '',
  city: '',
  year: null,
  start: '',
  end: '',
  prefaceTitle: '',
  prefaceAuthor: '',
  prefaceDescription: '',
  etc: '',
});

const uploadFiles = ref([]);
const previewFiles = ref([]);

const imagesInput = (data: any) => {
  uploadFiles.value = data.uploadFiles;
  previewFiles.value = data.previewFiles;
};

const emit = defineEmits<{
  (e: 'emitExhibitionData', value: any): void;
}>();

const submitExhibitionData = () => {
  const { wrapTextInPTag } = useParagraph();

  const exhibitionData = {
    title: exhibition.title,
    description: wrapTextInPTag(exhibition.description),
    location: exhibition.location,
    city: exhibition.city,
    year: exhibition.year,
    start: exhibition.start,
    end: exhibition.end,
    prefaceTitle: exhibition.prefaceTitle,
    prefaceAuthor: exhibition.prefaceAuthor,
    prefaceDescription: exhibition.prefaceDescription,
    etc: exhibition.etc,
    categoryId: 3,
    subCategoryId: exhibition.subCategoryId,
  };

  const formData: FormData = new FormData();
  _.forEach(uploadFiles.value, (file: any) => {
    formData.append('images', file);
  });

  emit('emitExhibitionData', { exhibitionData, formData });
};

const removeImage = (index: any) => {
  uploadFiles.value.splice(index, 1);
  previewFiles.value.splice(index, 1);
};
</script>
