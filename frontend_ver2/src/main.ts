import './assets/main.css'
import './assets/app.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router/router' // 匯入 router 而不是 routes
import vuetify from './plugins/vuetify'

import 'vuetify/styles' // 引入 Vuetify 樣式

const app = createApp(App)

app.use(createPinia())
app.use(router) // 使用 router 實例
app.use(vuetify)

app.mount('#app')
