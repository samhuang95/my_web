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

    <q-drawer
      v-model="drawerLeft"
      :width="200"
      :breakpoint="700"
      bordered
    >
      <q-scroll-area class="fit">
        <div class="my-[0.5rem] mx-[1rem] grid gap-[1rem]">
          <H2 class="h2 text-center my-[1rem]">Admin Tools</H2>
          <base-btn
            label="Management"
            btn-style="flat"
            btn-color="blue"
            :icon="`img:${serverSolid}`"
            @click="handleOpenManagement()"
          />

          <base-btn
            label="Create Article"
            btn-style="flat"
            btn-color="blue"
            :icon="`img:${fileArrowUpBlack}`"
            @click="handleCreateArticle()"
          />
        </div>
      </q-scroll-area>
    </q-drawer>

    <q-page-container>
      <q-page>
        <the-admin
          :is-open-management="adminStore.isOpenManagement"
          :is-open-create-page="adminStore.isOpenCreatePage"
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
import serverSolid from '../assets/icon/server-solid.svg';
import fileArrowUpBlack from '../assets/icon/file-arrow-up-black.svg';
import { useAdminStore } from '../stores/admin.store';

const adminStore = useAdminStore();

const handleCreateArticle = () => {
  adminStore.isOpenCreatePage = true;
  adminStore.isOpenManagement = false;
  adminStore.isOpenEditPage = false;
  adminStore.isOpenPreviewPage = false;
};

const handleOpenManagement = () => {
  adminStore.isOpenManagement = true;
  adminStore.isOpenCreatePage = false;
  adminStore.isOpenEditPage = false;
  adminStore.isOpenPreviewPage = false;
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
