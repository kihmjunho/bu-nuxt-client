import { ContentList } from '#build/components';
<template>
  <div class="cv">
    <div class="cv__profile">
      <img
        class="cv__image"
        src="https://buimages.s3.ap-northeast-2.amazonaws.com/cover.jpg"
      />
    </div>
    <div class="cv__text">
      <div class="cv__information">
        <h3 class="cv__name">Toots Kim</h3>
        <p class="cv__born">Born in Suwon, South Korea</p>
      </div>
      <div class="cv__exhibition">
        <div class="exhibition__inner">
          <h4 class="exhibition__type">Solo Exhibitions</h4>
          <ul class="exhibition__list">
            <li
              class="exhibition__item"
              v-for="item in props.solo"
              :key="item.id"
            >
              {{ item.year }} &lt;{{ item.content.title }}&gt; ({{
                item.location
              }}, {{ item.city }})
            </li>
          </ul>
        </div>
        <div class="exhibition__inner">
          <h4 class="exhibition__type">Group Exhibitions</h4>
          <ul class="exhibition__list">
            <li
              class="exhibition__item"
              v-for="item in props.group"
              :key="item.id"
            >
              {{ item.year }} &lt;{{ item.content.title }}&gt; ({{
                item.location
              }}, {{ item.city }})
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  solo: { type: Object, required: true },
  group: { type: Object, required: true },
});
</script>
