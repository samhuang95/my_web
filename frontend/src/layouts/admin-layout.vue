<template>
  <q-layout
    view="lhh LpR lff"
    container
    style="height: 1000px"
    class="shadow-2 rounded-borders main-padding"
  >
    <q-header
      reveal
      :class="$q.dark.isActive ? 'bg-secondary' : 'bg-grey'"
    >
      <q-toolbar>
        <q-btn
          flat
          round
          dense
          icon="menu"
          @click="drawerLeft = !drawerLeft"
        />
        <q-toolbar-title class="flex justify-between">
          <p>Header</p>
          <base-btn
            btn-style="flat"
            class="text-white"
            label="BACK TO HOME"
            @click="goToHome()"
          />
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-footer>
      <q-toolbar>
        <q-toolbar-title>Footer</q-toolbar-title>
      </q-toolbar>
    </q-footer>

    <q-drawer
      v-model="drawerLeft"
      :width="200"
      :breakpoint="700"
      bordered
    >
      <q-scroll-area class="fit">
        <div class="my-[0.5rem] mx-[1rem] grid gap-[1rem]">
          <H2 class="h2 text-center my-[1rem]">Admin Tool</H2>
          <base-btn
            label="Rich Text Editor"
            btn-style="flat"
            btn-color="teal"
            @click="handleOpenEditor()"
          />
          <base-btn
            label="Article Management"
            btn-style="flat"
            btn-color="teal"
            @click="handleOpenManagement()"
          />
        </div>
      </q-scroll-area>
    </q-drawer>

    <q-page-container>
      <q-page>
        <the-admin
          :is-open-editor="isOpenEditor"
          :is-open-management="isOpenManagement"
        />
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script
  setup
  lang="ts"
>
import { ref } from 'vue';
import router, { RouteName } from '../router/router';
import BaseBtn from '../components/base-btn.vue';
import theAdmin from '../views/the-admin.vue';

const isOpenEditor = ref<boolean>(true);
const isOpenManagement = ref<boolean>(false);

const handleOpenEditor = () => {
  isOpenEditor.value = true;
  isOpenManagement.value = false;
};

const handleOpenManagement = () => {
  isOpenManagement.value = true;
  isOpenEditor.value = false;
};

const drawerLeft = ref<boolean>(true);

const goToHome = () => {
  router.push({ name: RouteName.HOME });
};
</script>

<style
  lang="sass"
  scoped
></style>
