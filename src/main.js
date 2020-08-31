import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import 'normalize.css'
import 'assets/css/base.css'
import 'assets/fonts/iconfont.css'

import 'plugins/vant'

import http from 'network/http'

Vue.config.productionTip = false

Vue.prototype.$http = http

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
