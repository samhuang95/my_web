<template>
  <v-app>
    <component :is="layout">
      <template #default>
        <router-view />
      </template>
    </component>
  </v-app>
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
