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
      <p class="text-3xl font-bold text-gry-900 text-center">Sign up</p>
      <div class="p-[1.25rem] grid gap-[1.25rem]">
        <div class="grid gap-[0.625rem]">
          <p>Name</p>
          <div class="grid gap-[0.625rem]">
            <base-input
              v-model="nameInput"
              :type="'text'"
              class="w-full"
              @keyup.enter="submitSignup"
            />
            <span
              v-if="hasClickSubmitBtn && nameInput.trim() === ''"
              class="p3 text-red-500"
              >This field is required.</span
            >
          </div>
        </div>

        <div class="grid gap-[0.625rem]">
          <p>Email</p>
          <div class="grid gap-[0.625rem]">
            <base-input
              v-model="emailInput"
              :type="'text'"
              class="w-full"
              @keyup.enter="submitSignup"
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
              @keyup.enter="submitSignup"
            />
            <span
              v-if="hasClickSubmitBtn && passwordInput.trim() === ''"
              class="p3 text-red-500"
              >This field is required.</span
            >
          </div>
        </div>

        <div class="grid gap-[0.625rem]">
          <p>Confirm password</p>
          <div class="grid gap-[0.625rem]">
            <base-input
              v-model="confirmPasswordInput"
              :type="'password'"
              class="w-full"
              @keyup.enter="submitSignup"
            />
            <span
              v-if="hasClickSubmitBtn && confirmPasswordInput.trim() === ''"
              class="p3 text-red-500"
              >This field is required.</span
            >
            <span
              v-else-if="
                hasClickSubmitBtn && passwordInput !== confirmPasswordInput
              "
              class="p3 text-red-500"
              >The password confirmation is incorrect.</span
            >
          </div>
        </div>

        <!-- submit button -->
        <baseBtn
          label="Submit"
          btn-style="unelevated"
          btn-color="blue"
          type="button"
          :disabled="loading"
          @click="submitSignup"
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

const nameInput = ref<string>('');
const emailInput = ref<string>('');
const passwordInput = ref<string>('');
const confirmPasswordInput = ref<string>('');

const hasClickSubmitBtn = ref<boolean>(false);

const isInputEmpty = ref<boolean>(true);

const isCorrectAccount = ref<boolean>(false);

const loading = ref<boolean>(false);

const submitSignup = async () => {
  hasClickSubmitBtn.value = true;
  loading.value = true;
  emptyInputCheck();

  const accountDate = await accountStore.getAccount(emailInput.value);

  if (!isInputEmpty.value && Object.keys(accountDate.data).length === 0) {
    const accountData = {
      user_name: nameInput.value,
      password: passwordInput.value,
      email: emailInput.value,
    };
    await accountStore.createAccount(accountData);
    setLocalStageData('isLogIn', 'true');
    window.location.reload();
  } else {
    loading.value = false;
  }
};

const emptyInputCheck = () => {
  if (
    hasClickSubmitBtn.value &&
    nameInput.value.trim() === '' &&
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
