<template>
  <div>
    <component :is="layout">
      <template #default>
        <router-view />
      </template>
      <template #footer>
        <the-footer />
      </template>
    </component>
  </div>
</template>

<script
  setup
  lang="ts"
>
import articleLayout from '../src/layouts/article-layout.vue';

import adminLayout from '../src/layouts/admin-layout.vue';
import TheFooter from '../src/components/the-footer.vue';
import { useMeta } from 'quasar';
import { useRoute } from 'vue-router';
import { RouteName } from './router/router';
import { computed } from 'vue';

const route = useRoute();

const layout = computed(() => {
  if (route.name === RouteName.ADMIN) {
    return adminLayout;
  } else {
    return articleLayout;
  }
});

useMeta(() => ({
  title: `Sam's blog - ${route.name?.toString()}`,
  titleTemplate: (title) => `${title} v${import.meta.env.VITE_PACKAGE_VERSION}`,
}));
</script>

<style lang="sass">
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap')
html, body, #app
  width: 100%
  height: 100%
  padding: 0
  margin: 0
  font-family: 'Inter', sans-serif
</style>
