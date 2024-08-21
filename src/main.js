import { createApp } from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import router from './router'
import { loadFonts } from './plugins/webfontloader'

loadFonts()

import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:8000'; // Replace with your Laravel server URL

createApp(App)
  .use(vuetify)
  .use(router)
  .mount('#app')
