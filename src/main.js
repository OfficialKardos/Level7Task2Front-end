import { createApp } from 'vue';
import App from './App.vue';
import router from './router'
import { loadFonts } from './plugins/webfontloader'
import vuetify from './plugins/vuetify';

loadFonts()

import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:8000'; 

createApp(App)
  .use(vuetify)
  .use(router)
  .mount('#app')
