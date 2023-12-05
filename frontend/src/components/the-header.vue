<template>
  <q-header
    class="flex justify-center w-full bg-white fixed top-0 border-bottom z-[9999]"
  >
    <div class="w-full normal-padding flex">
      <button
        class="flex gap-[1rem] items-center"
        @click="goToHome()"
      >
        <q-icon
          :name="`img:${logo}`"
          class="w-auto h-[40px]"
        />
        <p class="text-brandBlue-100 text-2xl">Sam's blog</p>
      </button>
      <div class="ml-auto">
        <base-btn
          :label="`Marketing Note(${articleCounter('marketing')})`"
          btn-style="flat"
          class="text-brandBlue-100"
          @click="handleSelectedArticle('marketing')"
        />
        <base-btn
          :label="`Tech Note(${articleCounter('tech')})`"
          btn-style="flat"
          class="text-brandBlue-100"
          @click="handleSelectedArticle('tech')"
        />
        <base-btn
          label="About Me"
          btn-style="flat"
          class="text-brandBlue-100"
          :href="'https://linktr.ee/samhuang95'"
          target="_blank"
        />
        <base-btn
          label="My github"
          btn-style="flat"
          class="text-brandBlue-100"
          :href="'https://github.com/samhuang95'"
          target="_blank"
        />
      </div>
    </div>
  </q-header>
</template>

<script
  lang="ts"
  setup
>
import { computed, ref, watch } from 'vue';

import { useVModel } from '@vueuse/core';
import logo from '/logo.svg';
import baseBtn from '../components/base-btn.vue';
import { useArticleStore } from '../stores/article.store';
import router, { RouteName } from '../router/router';
import { useAsyncState } from '@vueuse/core';
import { Article } from '../types/article.type';

const articleStore = useArticleStore();

const articleData = ref<Article[]>([]);

const { isLoading, execute } = useAsyncState(
  async () => (await articleStore.getArticleList()).data,
  [],
  {
    resetOnExecute: false,
    onSuccess: (articleList) => {
      articleData.value = articleList;
    },
  }
);

const articleCounter = (articleTag: string) => {
  const counter = articleData.value.filter(
    (article) => article.article_tag === articleTag
  ).length;
  return counter;
};

interface Props {
  modelValue: boolean;
}
const props = withDefaults(defineProps<Props>(), {});
const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void;
}>();

const drawer = useVModel(props, 'modelValue');
watch(drawer, () => {
  emit('update:modelValue', drawer.value);
});

const goToHome = () => {
  router.push({ name: RouteName.HOME });
};

const handleSelectedArticle = (tagName: string) => {
  router.push({
    name: RouteName.HOME_FILTER,
    params: { articleTag: tagName },
  });
};
</script>
