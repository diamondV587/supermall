import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import FastClick from 'fastclick'

import vant from "vant";
import "vant/lib/index.css";

Vue.use(vant);

import toast from './components/common/toast'
Vue.use(toast)

FastClick.attach(document.body)

Vue.config.productionTip = false

Vue.prototype.$bus = new Vue();

new Vue({
  render: h => h(App),
  router,
  store,
}).$mount('#app')
