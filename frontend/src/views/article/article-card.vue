<template>
  <router-link
    :to="{
      name: RouteName.ARTICLE,
      params: { eng_title: article.eng_title },
    }"
  >
    <q-card
      flat
      bordered
      class="my-card general-rounded cursor-pointer w-[18rem] h-[22rem]"
    >
      <div class="relative">
        <q-img
          :src="article.cover_url"
          class="w-full h-full rounded-t-md"
        />
        <p
          class="capitalize absolute w-[5rem] rounded-md text-center transform translate-x-[1rem] -translate-y-[12.5rem] text-white"
          :class="[
            article.article_tag === 'marketing'
              ? 'bg-brand-400'
              : 'bg-brandBlue-50',
          ]"
        >
          {{ article.article_tag }}
        </p>
      </div>
      <q-card-section class="p-[1.25rem] flex flex-col gap-[0.5rem]">
        <h3 class="h3">
          {{ article.title }}
        </h3>
        <p class="truncate-summary">{{ props.article.summary }}</p>
      </q-card-section>
    </q-card>
  </router-link>
</template>
<script
  lang="ts"
  setup
>
import { RouteName } from '../../router/router';
import { Article } from '../../types/article.type';

interface Props {
  article: Article;
}
const props = withDefaults(defineProps<Props>(), {});
</script>
<style scoped>
.truncate-summary {
  @apply line-clamp-3; /* 這裡的 2 表示最多顯示兩行，你可以根據需要調整 */
}
</style>
