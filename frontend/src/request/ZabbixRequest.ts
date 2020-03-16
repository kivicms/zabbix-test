export default class ZabbixRequest {
  jsonrpc = '2.0'
  public method = 'host.get'
  auth = ''
  id = 0
  params: any[]

  constructor () {
    this.auth = localStorage.getItem('token') ?? ''
  }
}
