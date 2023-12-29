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
const accountStore = useAccountStore();

const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

function loadGoogleSignInScript() {
  const script = document.createElement('script');
  script.src = 'https://accounts.google.com/gsi/client';
  script.async = true;
  script.defer = true;
  document.head.appendChild(script);
}

const parseJwt = (credential: string) => {
  const base64Url = credential.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const jsonPayload = decodeURIComponent(
    atob(base64)
      .split('')
      .map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join('')
  );

  return JSON.parse(jsonPayload);
};

// 確保此函數在全域範圍內可訪問
window.handleCredentialResponse = function (response: { credential: string }) {
  const decoded = parseJwt(response.credential);
  console.log('Decoded::::', decoded);
  // const credential = response.credential;
  // accountStore.googleSignUp(credential);
  // 處理身份驗證回應
};

onMounted(() => {
  loadGoogleSignInScript();
});
</script>
