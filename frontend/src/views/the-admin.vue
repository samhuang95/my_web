<template>
  <q-page class="max-width m-auto">
    <div v-if="props.isOpenManagement"><the-article-management /></div>
    <div v-if="props.isOpenCreatePage"><the-article-create /></div>
  </q-page>
</template>

<script
  setup
  lang="ts"
>
import theArticleCreate from './the-article-create.vue';
import theArticleManagement from './the-article-management.vue';

interface Props {
  isOpenCreatePage: boolean;
  isOpenManagement: boolean;
}

const props = withDefaults(defineProps<Props>(), {});
</script>

<style
  scoped
  lang="sass"
></style>
