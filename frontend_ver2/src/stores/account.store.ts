import { defineStore } from 'pinia';
import { request } from '../common/api';
import { Account, inputData } from '../types/account.type';

export interface RequestData<T> {
  message: string;
  data: T;
}

export const useAccountStore = defineStore('account', () => {
  async function getAccount(email: string) {
    return request<RequestData<Account[]>>({
      method: 'get',
      url: `/account?email=${email}`,
    });
  }

  async function createAccount(accountData: inputData) {
    return request<RequestData<inputData>>({
      method: 'post',
      url: `/account`,
      data: accountData as unknown as undefined,
    });
  }

  const pairAccount = (inputData: object, comparisonData: object) => {
    if (
      inputData['email'] === comparisonData['email'] &&
      inputData['password'] === comparisonData['password']
    ) {
      return true;
    } else {
      return false;
    }
  };

  // const pairGoogleAccount = (inputData: object, comparisonData: object) => {
  //   if (
  //     inputData['email'] === comparisonData['email'] &&
  //     inputData['sub'] === comparisonData['sub']
  //   ) {
  //     return true;
  //   } else {
  //     return false;
  //   }
  // };

  const authenticateWithGoogleToken = (credentials: string) => {
    return request<RequestData<string>>({
      method: 'post',
      url: `/google_account`,
      data: credentials as unknown as undefined,
    });
  };

  return {
    getAccount,
    createAccount,
    pairAccount,
    authenticateWithGoogleToken,
  };
});
