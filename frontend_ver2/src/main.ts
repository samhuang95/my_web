import { createApp } from 'vue';
import router from './router/router';
import { createPinia } from 'pinia';
import i18n from './locales/i18n';
import { QuillEditor } from '@vueup/vue-quill';
import '@vueup/vue-quill/dist/vue-quill.snow.css';

import {
  Quasar,
  Notify,
  Dialog,
  Loading,
  QuasarPluginOptions,
  useQuasar,
} from 'quasar';
import quasarLang from 'quasar/lang/en-US';

// Import icon libraries
import '@quasar/extras/roboto-font/roboto-font.css';
import '@quasar/extras/material-icons/material-icons.css';

// Import Quasar css
import 'quasar/src/css/index.sass';
import App from './App.vue';

// Tailwind CSS
import './index.css';

// 自訂樣式
import './style/animate.sass';
import './style/global.sass';

Notify.registerType('custom-notify', {
  textColor: 'white',
  classes: 'bg-brand-400',
});

// font awesome settings //
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';

//---------- 引入所需icon -----------------------//
import {
  faCircleCheck,
  faCoins,
  faXmark,
  faArrowUpRightFromSquare,
} from '@fortawesome/free-solid-svg-icons';

library.add(faCircleCheck, faCoins, faXmark, faArrowUpRightFromSquare);
//---------- 引入所需icon -----------------------//

createApp(App)
  .use(Quasar, {
    plugins: {
      Notify,
      Dialog,
      Loading,
    },
    lang: quasarLang,
  } as QuasarPluginOptions)
  .use(createPinia())
  .use(router)
  .use(i18n)
  .component('font-awesome-icon', FontAwesomeIcon) // setting font-awesome
  .component('QuillEditor', QuillEditor)
  .mount('#app');
