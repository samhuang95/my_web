import axios from 'axios';
import router, { RouteName } from '../router/router';
import to from 'await-to-js';

import { parseSwaggerApi } from './parse-swagger-api';

// const staging = import.meta.env.MODE === 'staging' ? '/_stage' : '';
export const instance = axios.create({
  baseURL: import.meta.env.VITE_SERVER,
});

// instance.interceptors.response.use(
//   (response) => {
//     return response;
//   },
//   (error) => {
//     const { response } = error;

//     if ([401].includes(response.status)) {
//       router.push({ name: RouteName.LOGIN });
//     }

//     return Promise.reject(error);
//   }
// )

export interface RequestParams<T> {
  method: 'get' | 'post' | 'put' | 'patch' | 'delete';
  url: string;
  data?: T;
}

export async function request<R, T = undefined>(params: RequestParams<T>) {
  const { method, url, data } = params;

  const [err, result] = await to(
    instance.request<R>({
      method,
      url,
      data: method === 'get' ? undefined : data,
      params: method !== 'get' ? undefined : data,
    })
  );

  if (err) {
    return Promise.reject(err);
  }

  return result.data;
}

export const api = parseSwaggerApi<paths>();
