/* eslint-disable @typescript-eslint/no-explicit-any */
/** 各類表單驗證 function FP 版本 */

import { isNil } from 'lodash-es';
import { reduce, either, pipe, gt, length, lt } from 'ramda';

/** 數值是否大於零之正整數 */
export function isPositiveNumberGreaterThan0(value: any) {
  return /^\d*[1-9]\d*$/.test(`${value}`);
}

/** 數值是否正整數 */
export function isPositiveNumber(value: any) {
  return /^\d*[0-9]\d*$/.test(`${value}`);
}

/**
 * 數值是否為 `null`、`undefined`、`''`、`[]`
 */
export function isOptional(value: any) {
  if (Array.isArray(value)) {
    return value.length === 0;
  }

  return isNil(value) || value === '';
}
/** isOptional 的反轉 */
export function notEmpty(value: any) {
  return !isOptional(value);
}

export function isValidEmail(email: any) {
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

  return emailRegex.test(email);
}

/** 僅限 YYYY-MM-DD 格式 */
export function isDate(value: any) {
  const regex = /^(\d{4})-(\d{2})-(\d{2})$/;
  if (!regex.test(value)) {
    return false;
  }

  const [, year, month, day] = (regex.exec(value) as RegExpExecArray).map(
    Number
  );
  const date = new Date(year, month - 1, day);

  if (
    date.getFullYear() !== year ||
    date.getMonth() + 1 !== month ||
    date.getDate() !== day
  ) {
    return false;
  }

  return true;
}

/** 僅限 YYYY-MM-DD HH:mm:ss 格式 */
export function isDateTime(value: any) {
  const regex = /^(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2}):(\d{2})$/;
  if (!regex.test(value)) {
    return false;
  }

  const [, year, month, day, hour, minute, second] = (
    regex.exec(value) as RegExpExecArray
  ).map(Number);
  const date: Date = new Date(year, month - 1, day, hour, minute, second);

  if (
    date.getFullYear() != year ||
    date.getMonth() + 1 != month ||
    date.getDate() != day ||
    date.getHours() != hour ||
    date.getMinutes() != minute ||
    date.getSeconds() != second
  ) {
    return false;
  }

  return true;
}

export function isIframe(iframe: string): boolean {
  const regex = /<iframe[^>]*src="([^"]*)"[^>]*><\/iframe>/i;
  return regex.test(iframe);
}

export function isUrl(value: string): boolean {
  const regex = new RegExp(/^https?:\/\//); // fragment locator
  return !!regex.test(value);
}

export const isLessThen = (level: number) => pipe(length, lt(level));

/**
 * check if url/filename is image file or not
 *
 * https://www.jstips.co/zh_tw/javascript/get-file-extension/
 */
export const isImageFile = (name: string): boolean => {
  if (typeof name !== 'string') return false;

  const fileExtension = name.slice(((name.lastIndexOf('.') - 1) >>> 0) + 2);

  const imageExtensions = ['jpg', 'jpeg', 'png'];

  return imageExtensions.includes(fileExtension);
};
