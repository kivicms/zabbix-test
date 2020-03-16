export default class Request {
  jsonrpc = '2.0'
  method = 'host.get'
  auth = ''
  id = 0
  params: any = []

  constructor (params: any[]) {
    this.params = params
    this.auth = localStorage.getItem('token') ?? ''
  }
}
