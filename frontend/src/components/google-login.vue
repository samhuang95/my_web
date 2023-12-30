<template>
  <!-- CSS ref: https://developers.google.com/identity/gsi/web/tools/configurator?hl=zh-tw -->
  <div
    id="g_id_onload"
    :data-client_id="clientId"
    data-callback="handleCredentialResponse"
  ></div>
  <div
    class="g_id_signin pl-[1rem]"
    data-type="icon"
    data-shape="rectangular"
    data-locale="en-US"
    data-text="signin_with"
    data-size="large"
  ></div>
</template>

<script
  setup
  lang="ts"
>
import { ref, onMounted } from 'vue';
import { useAccountStore } from '../stores/account.store';
import { setLocalStageData } from '../common/utils';
import { useAsyncState } from '@vueuse/core';

const emailInput = ref<string>('');
const googlToken = ref<string>('');
const isCorrectAccount = ref<boolean>(false);

const accountStore = useAccountStore();
const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

function loadGoogleSignInScript() {
  const script = document.createElement('script');
  script.src = 'https://accounts.google.com/gsi/client';
  script.async = true;
  script.defer = true;
  document.head.appendChild(script);
}

// Make sure the function can visit on global.
window.handleCredentialResponse = async function (response: {
  credential: string;
}) {
  const googleAuthenticateData = await accountStore.authenticateWithGoogleToken(
    response.credential
  );

  const { isLoading, execute } = useAsyncState(
    async () =>
      (await accountStore.getAccount(googleAuthenticateData.data['email']))
        .data,
    [],
    {
      resetOnExecute: false,
      onSuccess: (accountInfo) => {
        if (Object.keys(accountInfo).length === 0) {
          alert('Account is not exist.');
        } else {
          const inputData = {
            email: googleAuthenticateData.data['email'],
            googlToken: googleAuthenticateData.data['google_token'],
          };

          const comparisonData = {
            email: accountInfo['email'],
            googlToken: accountInfo['google_token'],
          };

          console.log(inputData)
          console.log(comparisonData)

          const isPairAccount = accountStore.pairAccount(
            inputData,
            comparisonData
          );

          if (isPairAccount) {
            isCorrectAccount.value = true;
            setLocalStageData('isLogIn', 'true');
            setLocalStageData('role', accountInfo['role']);
            window.location.reload();
          }
        }
      },
    }
  );
};

onMounted(() => {
  loadGoogleSignInScript();
});
</script>
