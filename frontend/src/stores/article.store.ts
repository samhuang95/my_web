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
  async function getPublishedArticleList() {
    return request<RequestData<Article[]>, Article>({
      method: 'get',
      url: `/article-list?statue=published`,
    });
  }
  async function getArticleList() {
    return request<RequestData<Article[]>, Article>({
      method: 'get',
      url: `/article-list`,
    });
  }

  async function getArticle(article_id: string) {
    return request<RequestData<Article[]>, Article>({
      method: 'get',
      url: `/article?article_id=${article_id}`,
    });
  }

  return {
    getPublishedArticleList,
    getArticleList,
    getArticle,
    
  };
});
