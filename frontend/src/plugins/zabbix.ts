import { ZabbixClient } from 'zabbix-client'
import _Vue from 'vue'

export function ZabbixPlugin (Vue: typeof _Vue): void {
  const zabbixClient = new ZabbixClient('http://localhost:8888/api_jsonrpc.php')
  Vue.prototype.$zabbixClient = zabbixClient
}
