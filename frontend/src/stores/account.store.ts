import { defineStore } from 'pinia';
import { request } from '../common/api';
import { Account } from '../types/account.type';

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

  // async function registerAccount(account: Account) {
  //   return 'AA'
  // }

  const pairAccount = (inputData: object, comparisonData: object) => {
    if (
      inputData['email'] === comparisonData['email'] &&
      inputData['password'] === comparisonData['password']
    ) {
      return true;
    } else {
      return false;
    }
    //
  };

  return {
    getAccount,
    pairAccount,
  };
});
