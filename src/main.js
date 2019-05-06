import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import InfiniteLoading from 'vue-infinite-loading';
import { MdCard } from 'vue-material/dist/components'
import 'vue-material/dist/vue-material.min.css'

import routes from './routes';

Vue.use(InfiniteLoading);
Vue.use(VueRouter);
Vue.use(MdCard);

Vue.config.productionTip = false

const router = new VueRouter({routes});

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')