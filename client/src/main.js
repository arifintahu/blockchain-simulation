import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import vuetify from './plugins/vuetify';
import axios from 'axios';

Vue.prototype.$http    = axios;
Vue.config.productionTip = false;

axios.interceptors.request.use((config) => {
    if(!config.url.includes(`http`)) {
        config.url = `http://localhost:3000/api${config.url}`
    }

    config.headers.common['Access-Control-Allow-Origin'] = '*';

    return config;
});

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount('#app');
