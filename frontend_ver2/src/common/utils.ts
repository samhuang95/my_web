import { isEqual, get, isObject } from 'lodash-es';
import { either, pipeWith, reduce } from 'ramda';
import { SimplifyToObjectIdDeep } from '../types';

/** 比較兩物件是否在所有指定路徑接相等 */
export function isEqualObject(
  value: any,
  other: any,
  paths: string[]
): boolean {
  const anyNot = paths.some(
    (path) => !isEqual(get(value, path), get(other, path))
  );

  return !anyNot;
}

/** 提取並替換 Mongo Document 物件 _id 部分，
 * 用於將 form 物件資料內的關聯欄位轉換成更新用資料。
 *
 * @example
 * ```typescript
 * // 例如目前的 form 為：
 * const data = {
 *   a: 1,
 *   b: {
 *     _id: '2'
 *   },
 *   c: [
 *     {
 *       data: 3,
 *       d: {
 *         _id: '4',
 *       }
 *     }
 *   ]
 * }
 *
 * // 可以看出含有 _id 的物件是關聯資料，變更的時候應該只給 _id，而不是整個物件。
 * // 得 API 傳輸的變更用資料為：
 * const data = {
 *   a: 1,
 *   b: '2',
 *   c: [
 *     {
 *       data: 3,
 *       d: '4'
 *     }
 *   ]
 * }
 * ```
 */
export function simplifyToDocIdDeep<T>(
  object: T
): T extends object ? SimplifyToObjectIdDeep<T> : T {
  // 一般型別
  if (!isObject(object)) {
    const value: any = object;
    return value;
  }

  // 矩陣
  if (Array.isArray(object)) {
    const result: any = object.map(simplifyToDocIdDeep);
    return result;
  }

  // 單層
  if (object && '_id' in object) {
    return object._id as any;
  }

  // 深層物件
  const result: any = {};

  Object.entries(object as any).forEach(([key, value]: [string, any]) => {
    if (Array.isArray(value)) {
      const newValue = value.map(simplifyToDocIdDeep);
      result[key] = newValue;
      return;
    }

    if (typeof value === 'object') {
      if ('_id' in value) {
        result[key] = value._id;
        return;
      }

      const newValue = simplifyToDocIdDeep(value);
      result[key] = newValue;
      return;
    }

    result[key] = value;
  });

  return result;
}

/** either 任意數量參數版本
 *
 * @example
 * 配合 quasar 的 rule，可以這樣建立：
 * ```typescript
 * const isIframeRule: ValidationRule[] = [
 *   eitherAny(isIframe, always('必須為有效的 iframe 標籤')),
 * ];
 * const notEmptyRule: ValidationRule[] = [
 *   eitherAny(notEmpty, always('請輸入文字')),
 * ];
 * ```
 *
 * @example
 * 可串聯多個驗證
 * ```typescript
 * // 可選數值輸入框
 * const numberRule: ValidationRule[] = [
 *   eitherAny(isOptional, isPositiveNumber, always('必須為大於零正整數')),
 * ];
 * ```
 */
export function eitherAny(...fns: any[]) {
  return reduce(either, fns[0], fns.slice(1));
}

/** 協助處理 remeda pipe 中的 promise
 *
 *
 * @example
 * // 原本每一個 async 後都要先 await 才能拿到 data
 * ```typescript
 * pipe(
 *   'data',
 *   async (data) => data,
 *   async (promise) => {
 *     const data = await promise;
 *   },
 * );
 *
 * // 用 then 包裝一下就不用了
 * pipe(
 *   'data',
 *   async (data) => data,
 *   then(async (data) => { }),
 * );
 * ```
 */
export function then<T, R>(
  fn: (a: T extends Promise<infer S> ? S : T) => R | Promise<R>
): (a: T) => Promise<R> {
  return async (a: T) => {
    return (fn as any)(await a);
  };
}

/**儲存 localStage 資料 */
export const setLocalStageData = (key: string, value: string) => {
  localStorage.setItem(key, value);
};

/**取得 localStage 資料*/
export const getLocalStageData = (key: string, trans: '' | 'boolean' = '') => {
  let output: string | boolean | null = localStorage.getItem(key);

  switch (trans) {
    case 'boolean':
      output = Boolean(output);
      break;

    default:
      break;
  }
  return output;
};

/**清除指定 localStage 資料*/
export const removeLocalStageData = (key: string) => {
  localStorage.removeItem(key);
};

/**清除所有 localStage 資料 */
export const clearLocalStageData = () => {
  localStorage.clear();
};
