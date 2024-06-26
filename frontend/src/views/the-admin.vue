<template>
  <q-page class="max-width m-auto">
    <div v-if="adminStore.isOpenManagement"><the-article-management /></div>
    <div v-if="adminStore.isOpenCreatePage"><the-article-create /></div>
    <div v-if="adminStore.isOpenEditPage"><the-article-editor /></div>
  </q-page>
</template>

<script
  setup
  lang="ts"
>
import theArticleCreate from './admin/the-article-create.vue';
import theArticleManagement from './admin/the-article-management.vue';
import theArticleEditor from './admin/the-article-editor.vue';

import { useAdminStore } from '../stores/admin.store';

const adminStore = useAdminStore();
</script>

<style
  scoped
  lang="sass"
></style>
