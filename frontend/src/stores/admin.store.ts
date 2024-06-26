import { defineStore } from 'pinia';
import { request } from '../common/api';
import { ref } from 'vue';

export const useAdminStore = defineStore('admin', () => {
  const isOpenCreatePage = ref<boolean>(false);
  const isOpenManagement = ref<boolean>(true);

  const isOpenEditPage = ref<boolean>(false);
  const isOpenPreviewPage = ref<boolean>(false);

  const selectedArticleID = ref<string>('');

  return {
    isOpenCreatePage,
    isOpenManagement,
    isOpenEditPage,
    isOpenPreviewPage,
    selectedArticleID,
  };
});
