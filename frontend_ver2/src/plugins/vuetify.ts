// src/plugins/vuetify.ts
import { createVuetify } from 'vuetify'
import 'vuetify/styles' // 匯入 Vuetify 樣式
import { aliases, mdi } from 'vuetify/iconsets/mdi-svg' // 使用 Material Design Icons

// 若需要進一步自訂 Vuetify 主題，請在這裡配置
const vuetify = createVuetify({
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: {
      mdi,
    },
  },
  theme: {
    defaultTheme: 'light',
    themes: {
      light: {
        colors: {
          primary: '#1976D2',
          secondary: '#424242',
          accent: '#82B1FF',
          error: '#FF5252',
          info: '#2196F3',
          success: '#4CAF50',
          warning: '#FB8C00',
        },
      },
    },
  },
})

export default vuetify
