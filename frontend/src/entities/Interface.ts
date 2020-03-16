export default class Interface {
  type = ''
  main = ''
  useip = ''
  ip = ''
  dns = ''
  port = ''

  constructor (type: string, main: string, useip: string, ip: string, dns: string, port: string) {
    this.type = type
    this.main = main
    this.useip = useip
    this.ip = ip
    this.dns = dns
    this.port = port
  }
}
