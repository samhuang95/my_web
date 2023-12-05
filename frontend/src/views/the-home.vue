<template>
  <q-img
    src="https://cdn.quasar.dev/img/parallax2.jpg"
    style="max-width: auto; height: 150px"
  >
    <div class="absolute-full flex flex-center text-center">
      <p>
        Hi, there is Sam’s skill record space!<br />
        If you like Marketing and Tech, we could have a touch!
      </p>
    </div>
  </q-img>

  <q-page class="main-padding max-width m-auto">
    <div class="w-[30rem] m-auto">
      <q-input
        v-model="searchText"
        rounded
        outlined
        color="light-blue-10"
        class="py-[1rem]"
      >
        <template #append>
          <q-icon :name="`img:${magnifierIcon}`"></q-icon>
        </template>
      </q-input>
    </div>
    <div>
      <div
        v-if="filteredArticles.length !== 0"
        class="flex gap-[1.25rem] justify-center"
      >
        <article-card
          v-for="article in filteredArticles"
          :key="article.eng_title"
          :article="article"
        />
      </div>
      <div
        v-else
        class="justify-center"
      >
        <not-found-page />
      </div>
    </div>
  </q-page>
</template>

<script
  setup
  lang="ts"
>
import { ref, watchEffect } from 'vue';
import { useRoute } from 'vue-router';

import magnifierIcon from '../assets/icon/magnifier-icon.svg';
import articleCard from './article/article-card.vue';
import notFoundPage from '../components/not-found-page.vue';

import { useArticleStore } from '../stores/article.store';
import { useAsyncState } from '@vueuse/core';
import { Article } from '../types/article.type';

const searchText = ref<string>('');
const articleData = ref<Article[]>([]);

const route = useRoute();
const articleStore = useArticleStore();
const filteredArticles = ref<Article[]>([]);

const { isLoading, execute } = useAsyncState(
  async () => (await articleStore.getArticleList()).data,
  [],
  {
    resetOnExecute: false,
    onSuccess: (articleList) => {
      console.log(articleList);
      articleData.value = articleList;

      watchEffect(() => {
        const articleTag = route.params.articleTag;
        console.log(articleTag);

        const keyword = searchText.value.toLowerCase().trim();

        if (articleTag !== undefined) {
          filteredArticles.value = articleList.filter(
            (obj) => obj.article_tag === articleTag
          );

          if (keyword !== '') {
            console.log('keyword::', keyword);
            // Filter the article according to keyword and article status is 'published'.
            filteredArticles.value = filteredArticles.value.filter(
              (article) =>
                (article.title.toLowerCase().includes(keyword) ||
                  article.summary.toLowerCase().includes(keyword)) &&
                article.article_tag === articleTag
            );
          }
        } else {
          // No specific articleTag, consider only keyword filter
          if (keyword !== '') {
            console.log('keyword::', keyword);
            // Filter the article according to keyword and article status is 'published'.
            filteredArticles.value = articleList.filter(
              (article) =>
                article.title.toLowerCase().includes(keyword) ||
                article.summary.toLowerCase().includes(keyword)
            );
          } else {
            // No articleTag and no keyword, show all articles
            filteredArticles.value = articleList;
          }
        }
      });
    },
  }
);
</script>

<style
  scoped
  lang="sass"
></style>
