import '@babel/polyfill'
import 'mutationobserver-shim'
import Vue from 'vue'
import './plugins/fontawesome'
import './plugins/axios'
import { ZabbixPlugin } from './plugins/zabbix'
import './plugins/bootstrap-vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import vSelect from 'vue-select'

import 'vue-select/src/scss/vue-select.scss'
// import { ZabbixClient } from 'zabbix-client/dist'

// Vue.prototype.$zabbixClient = new ZabbixClient('http://localhost:8888/api_jsonrpc.php')
Vue.use(ZabbixPlugin)
Vue.component('v-select', vSelect)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
