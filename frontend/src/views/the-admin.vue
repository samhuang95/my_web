<template>
  <q-page class="max-width m-auto">
    <div v-if="props.isOpenEditor"><the-article-editor /></div>
    <div v-if="props.isOpenManagement"><the-article-management /></div>
  </q-page>
</template>

<script
  setup
  lang="ts"
>
import theArticleEditor from './the-article-editor.vue';
import theArticleManagement from './the-article-management.vue';

interface Props {
  isOpenEditor: boolean;
  isOpenManagement: boolean;
}

const props = withDefaults(defineProps<Props>(), {});
</script>

<style
  scoped
  lang="sass"
></style>
