<template>
  <form
    enctype="multipart/form-data"
    class="form form--content"
    @submit.prevent="update"
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

    <button class="form__button" type="submit">create {{ props.type }}</button>
  </form>
</template>

<script setup lang="ts">
const props = defineProps({
  data: { type: Object as () => any, required: true },
  categories: { type: Array, required: true },
});

const title = ref('');
const subCategoryId = ref(null);
const description = ref('');
const width = ref(null);
const height = ref(null);
const materials = ref('');
const year = ref(null);
const price = ref(null);
const collector = ref('');

watchEffect(() => {
  title.value = props.data.title;
  subCategoryId.value = props.data.subCategoryId;
  if (props.data.description) {
    description.value = useRemoveTag(props.data.description);
  }
  width.value = props.data.width;
  height.value = props.data.height;
  materials.value = props.data.materials;
  year.value = props.data.year;
  price.value = props.data.price;
  collector.value = props.data.collector;
});

const emit = defineEmits(['emitUpdate']);

const update = async () => {
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
    collector: collector.value,
    subCategoryId: subCategoryId.value,
  };

  emit('emitUpdate', { emitData });
};
</script>
