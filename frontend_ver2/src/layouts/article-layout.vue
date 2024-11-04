<template>
  <q-layout
    view="hHh lpR fFf"
    class="relative"
  >
    <div
      v-if="drawerVisible"
      class="bg-black opacity-[0.2] fixed w-full h-[100dvh] z-[1]"
      @click="drawerVisible = false"
    />
    <the-header
      :model-value="drawerVisible"
      @update:model-value="(value) => toggleDrawerVisible(value)"
    />

    <q-drawer
      v-model="drawerVisible"
      :breakpoint="290"
      :width="200"
      side="left"
      bordered
      overlay
    >
      <q-scroll-area class="fit">
        <div
          class="flex-1 flex flex-col justify-between min-h-[calc(100dvh-72px)]"
        >
          <q-list>
            <template
              v-for="(menuItem, index) in menuList"
              :key="index"
            >
              <q-item
                v-ripple
                class="px-[1rem] py-[0.75rem]"
                clickable
                :active="menuItem.label === 'Outbox'"
              >
                <q-item-section class="b1">
                  {{ menuItem.label }}
                </q-item-section>
              </q-item>
            </template>
          </q-list>
          <div class="px-[0.625rem] py-[0.75rem] flex flex-col gap-[0.5rem]">
            <base-btn
              label="Log In"
              :to="{ name: RouteName.CATALOG }"
              btn-style="outline"
              btn-color="black"
            />
            <base-btn
              label="Sign Up"
              :to="{ name: RouteName.CATALOG }"
              btn-style="unelevated"
              btn-color="brand"
            />
          </div>
        </div>
      </q-scroll-area>
    </q-drawer>
    <q-page-container class="w-full bg-white relative">
      <slot />
    </q-page-container>
    <slot name="footer" />
  </q-layout>
</template>

<script
  setup
  lang="ts"
>
import TheHeader from '../../src/components/the-header.vue';

import { useToggle } from '@vueuse/core';

import { ref } from 'vue';
import { RouteName } from '../router/router';
import BaseBtn from '../components/base-btn.vue';
const [drawerVisible, toggleDrawerVisible] = useToggle(false);

const menuList = [
  {
    label: 'Catalog',
    path: RouteName.CATALOG,
  },
  {
    label: 'Model Request',
    path: RouteName.MODEL_REQUEST,
  },
];
</script>

<style
  lang="sass"
  scoped
></style>
