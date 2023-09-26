<template>
  <Section>
    <SectionTitle>{{ props.title }}</SectionTitle>
    <ContentTab
      v-if="categories && category"
      :data="props.categories"
      :category="props.category"
      :subCategory="props.subCategory"
    />

    <SectionList category="artwork" v-if="artwork || post">
      <SectionItemArtwork
        v-if="artwork"
        v-for="item in props.data"
        :key="item.id"
        :data="item"
      />

      <SectionItemPost
        v-if="post"
        v-for="item in props.data"
        :key="item.id"
        :data="item"
      />
    </SectionList>

    <SectionList category="exhibition" v-if="exhibition">
      <SectionItemExhibition
        v-for="item in props.data"
        :key="item.id"
        :data="item"
      />
    </SectionList>
  </Section>
</template>

<script setup lang="ts">
import { Category, Content } from '@/types/types';

const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  category: String,
  subCategory: String,
  categories: Array as () => Category[],
  data: Array as () => Content[],
});

const artwork = ref(props.title.includes('artwork'));
const exhibition = ref(props.title.includes('exhibition'));
const post = ref(props.title.includes('post'));
</script>
