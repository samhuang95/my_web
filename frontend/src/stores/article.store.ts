import exp from 'constants';
import { defineStore } from 'pinia';
import { ref } from 'vue';
import { request } from '../common/api';
import {
  Article,
  createArticleType,
  updateArticleType,
} from '../types/article.type';

export interface RequestData<T> {
  message: string;
  data: T;
}

export const useArticleStore = defineStore('article', () => {
  async function getPublishedArticleList() {
    return request<RequestData<Article[]>, Article>({
      method: 'get',
      url: `/article-list?state=published`,
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

  async function createArticle(inputData: createArticleType) {
    return request<RequestData<createArticleType>, createArticleType>({
      method: 'post',
      url: '/article',
      data: inputData,
    });
  }

  async function updateArticle(
    article_id: string,
    updateData: updateArticleType
  ) {
    return request<RequestData<updateArticleType>, updateArticleType>({
      method: 'patch',
      url: `/article?article_id=${article_id}`,
      data: updateData,
    });
  }

  return {
    getPublishedArticleList,
    getArticleList,
    getArticle,
    createArticle,
    updateArticle,
  };
});
