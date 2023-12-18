<template>
  <q-page class="w-full flex justify-center p-[5rem]">
    <div v-if="hasClickSubmitBtn && !isInputEmpty && isCorrectAccount">
      <div class="w-full h-full">
        <loading-page class="absolute inset-0 m-auto z-50 flex items-center" />
        <div
          class="fixed top-0 left-0 w-full h-full bg-white opacity-60 z-40"
        />
      </div>
    </div>
    <div class="flex flex-col gap-[1rem] md:w-[440px]">
      <p class="text-3xl font-bold text-gry-900 text-center">Log In</p>
      <div class="p-[1.25rem] grid gap-[1.25rem]">
        <div class="grid gap-[0.625rem]">
          <p>Email</p>
          <div class="grid gap-[0.625rem]">
            <base-input
              v-model="emailInput"
              :type="'text'"
              class="w-full"
              @keyup.enter="submitLogin"
            />
            <span
              v-if="hasClickSubmitBtn && emailInput.trim() === ''"
              class="p3 text-red-500"
              >This field is required.</span
            >
          </div>
        </div>
        <div class="grid gap-[0.625rem]">
          <p>Password</p>
          <div class="grid gap-[0.625rem]">
            <base-input
              v-model="passwordInput"
              :type="'password'"
              class="w-full"
              @keyup.enter="submitLogin"
            />
            <span
              v-if="hasClickSubmitBtn && emailInput.trim() === ''"
              class="p3 text-red-500"
              >This field is required.</span
            >
            <span
              v-else-if="hasClickSubmitBtn && !isCorrectAccount"
              class="p3 text-red-500"
              >Invalid email or password. Please double-check or sign up.</span
            >
          </div>
        </div>

        <!-- submit button -->
        <baseBtn
          label="Log In"
          btn-style="unelevated"
          btn-color="blue"
          type="button"
          :disabled="loading"
          @click="submitLogin"
        >
        </baseBtn>
      </div>
    </div>
  </q-page>
</template>

<script
  setup
  lang="ts"
>
import { ref, watchEffect } from 'vue';
import { useAsyncState } from '@vueuse/core';

import { useRouter, useRoute } from 'vue-router';
import { RouteName } from '../router/router';
import { useAccountStore } from '../stores/account.store';
import { setLocalStageData, getLocalStageData } from '../common/utils';

import baseInput from '../components/base-input.vue';
import baseBtn from '../components/base-btn.vue';
import loadingPage from '../components/loading-page.vue';

const router = useRouter();
const route = useRoute();
const accountStore = useAccountStore();

const emailInput = ref<string>('');
const passwordInput = ref<string>('');

const hasClickSubmitBtn = ref<boolean>(false);

const isInputEmpty = ref<boolean>(true);

const isCorrectAccount = ref<boolean>(false);

const loading = ref<boolean>(false);

const submitLogin = () => {
  hasClickSubmitBtn.value = true;
  loading.value = true;
  emptyInputCheck();
  if (!isInputEmpty.value) {
    const { isLoading, execute } = useAsyncState(
      async () => (await accountStore.getAccount(emailInput.value)).data,
      [],
      {
        resetOnExecute: false,
        onSuccess: (accountInfo) => {
          console.log('accountInfo::::', accountInfo);
          if (Object.keys(accountInfo).length === 0) {
            alert('Account is not exist.');
          } else {
            const inputData = {
              email: emailInput.value,
              password: passwordInput.value,
            };

            const comparisonData = {
              email: accountInfo['email'],
              password: accountInfo['password'],
            };

            const isPairAccount = accountStore.pairAccount(
              inputData,
              comparisonData
            );

            if (isPairAccount) {
              isCorrectAccount.value = true;
              setLocalStageData('isLogIn', 'true');
              window.location.reload();
            }
          }
        },
      }
    );
  } else {
    loading.value = false;
  }
};

const emptyInputCheck = () => {
  if (
    hasClickSubmitBtn.value &&
    emailInput.value.trim() === '' &&
    passwordInput.value.trim() === ''
  ) {
    isInputEmpty.value = true;
  } else {
    isInputEmpty.value = false;
  }
};
</script>
<style>
input[type='password'] {
  letter-spacing: 8px;
}
</style>
