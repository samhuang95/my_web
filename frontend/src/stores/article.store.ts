import exp from 'constants';
import { defineStore } from 'pinia';
import { ref } from 'vue';
import { request } from '../common/api';
import { Article } from '../types/article.type';

export interface RequestData<T> {
  message: string;
  data: T;
}

export const useArticleStore = defineStore('article', () => {
  async function getArticleList() {
    return request<RequestData<Article[]>, Article>({
      method: 'get',
      url: `/article-list?statue=published`,
    });
  }

  return {
    getArticleList,
  };
});
