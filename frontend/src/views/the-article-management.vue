<template>
  <div class="flex flex-col gap-[0.5rem] p-[2.5rem]">
    <H1 class="h1">Management</H1>
    <q-table
      :columns="tableColumns"
      :rows="tableRows"
      row-key="name"
      class="capitalize"
    >
      <template #no-data>
        <div class="flex gap-[0.375rem] m-auto">
          <img src="../assets/icon/warning-icon.svg" />
          <p>No Data</p>
        </div>
      </template>

      <template #body-cell-action="props">
        <q-td
          :props="props"
          style="width: 38.5%"
        >
          <div class="flex justify-end">
            <div v-if="props.row.statue !== 'published'">
              <base-btn
                label="Publish"
                btn-style="flat"
                btn-size="sm"
                :icon="`img:${fileArrowUp}`"
              />
            </div>
            <div v-else>
              <base-btn
                label="Withdraw"
                btn-style="flat"
                btn-size="sm"
                :icon="`img:${closeWindowIcon}`"
              />
            </div>
            <div>
              <base-btn
                label="Preview"
                btn-style="flat"
                btn-size="sm"
                :icon="`img:${eyeIcon}`"
              />
            </div>
            <div>
              <base-btn
                label="Editor"
                btn-style="flat"
                btn-size="sm"
                :icon="`img:${editorIcon}`"
              />
            </div>
          </div>
        </q-td>
      </template>
    </q-table>
  </div>
</template>

<script
  setup
  lang="ts"
>
import { computed } from 'vue';

import { useArticleStore } from '../stores/article.store';

import baseBtn from '../components/base-btn.vue';
import closeWindowIcon from '../assets/icon/close-window-icon.svg';
import fileArrowUp from '../assets/icon/file-arrow-up.svg';
import eyeIcon from '../assets/icon/eye-icon.svg';
import editorIcon from '../assets/icon/editor-icon.svg';

const articleStore = useArticleStore();

const tableColumns = [
  {
    name: 'title',
    align: 'left',
    label: 'Title',
    field: 'title',
  },
  {
    name: 'articleTag',
    align: 'left',
    label: 'Article Tag',
    field: 'articleTag',
  },
  {
    name: 'statue',
    align: 'left',
    label: 'Statue',
    field: 'statue',
    sortable: true,
  },
  {
    name: 'createdAt',
    align: 'left',
    label: 'Created Date',
    field: 'createdAt',
    sortable: true,
  },
  {
    name: 'action',
    align: 'center',
    label: 'Action',
    field: 'action',
  },
];

const tableRows = computed(() => {
  return articleStore.article;
});
</script>

<style
  lang="sass"
  scoped
>
.my-sticky-header-table
  /* height or max-height is important */
  height: auto

.my-sticky-header-table ::v-deep thead tr:first-child th
  background-color: #F7F7F7


  thead tr th
    position: sticky
    z-index: 1


  thead tr:first-child th
    top: 0

  /* this is when the loading indicator appears */
  &.q-table--loading thead tr:last-child th
    /* height of all previous header rows */
    top: 48px

  /* prevent scrolling behind sticky top row on focus */
  tbody
    /* height of all previous header rows */
    scroll-margin-top: 48px
</style>

<style scoped>
.q-table__col-model-name {
  width: auto;
}

.q-table__bottom-no-data {
  text-align: center;
}

.q-table {
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
