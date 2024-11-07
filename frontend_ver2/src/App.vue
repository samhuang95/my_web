<template>
  <div id="app" class="app-background">
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

<script setup lang="ts">
import { useRoute } from 'vue-router'
import { computed } from 'vue'

import management_layout from '../src/layouts/management_layout.vue'
import common_layout from '../src/layouts/common_layout.vue'

import { RouteName } from './router/router'

const route = useRoute()

const layout = computed(() => {
  if (route.name === RouteName.MANAGEMENT) {
    return management_layout
  } else {
    return common_layout
  }
})
</script>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }

  html,
  body,
  #app {
    height: 100%;
    margin: 0;
    padding: 0;
  }

  .app-background {
    background-image: url('@/assets/background.svg');
    background-size: cover;
    background-repeat: no-repeat;
    background-attachment: fixed;
    background-position: center;
  }
}
</style>
