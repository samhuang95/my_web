<template>
  <div v-if="!isLoading">
    <div class="h-[150px]">
      <q-img
        src="https://cdn.quasar.dev/img/parallax2.jpg"
        style="max-width: auto; height: 150px"
      >
        <div class="absolute-full flex flex-center text-center">
          <H1 class="grid content-end h1 capitalize p-[1rem]">
            - {{ articleData?.article_tag }} Note -
          </H1>
        </div>
      </q-img>
    </div>
    <q-page class="main-padding max-width m-auto">
      <div>
        <div class="p-[1rem]">
          <H1 class="h1 text-brandBlue-100">{{ articleData?.title }}</H1>
          <H3 class="h3">{{ articleData?.summary }}</H3>
        </div>
        <div>
          <base-rtf-area :html="articleData?.content" />
        </div>
      </div>
    </q-page>
  </div>
</template>

<script
  setup
  lang="ts"
>
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import { useArticleStore } from '../stores/article.store';

import baseRtfArea from '../components/base-rtf-area.vue';
import { computed } from 'vue';
import { useAsyncState } from '@vueuse/core';
import { Article } from '../types/article.type';

const articleStore = useArticleStore();
const route = useRoute();
const articleData = ref<Article>();
const { isLoading, execute } = useAsyncState(
  async () => (await articleStore.getPublishedArticleList()).data,
  [],
  {
    resetOnExecute: false,
    onSuccess: (articleList) => {
      articleData.value = articleList.find(
        (article) => article.eng_title === route.params.eng_title
      );
    },
  }
);
</script>

<style
  scoped
  lang="sass"
></style>
