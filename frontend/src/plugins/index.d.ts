import Vue, { VueConstructor } from 'vue'
import { AxiosInstance } from 'axios'
// import { ZabbixInstance } from './zabbix'

declare global {
  interface Window {
    axios: AxiosInstance;
    // zabbix: ZabbixInstance;
  }
}

declare module 'vue/types/vue' {
  interface Vue {
    $axios: AxiosInstance;
  }
  interface VueConstructor {
    $axios: AxiosInstance;
  }
}
