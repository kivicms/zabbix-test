import ZabbixRequest from '@/request/ZabbixRequest'
import Group from '@/entities/Group'
import Inventory from '@/entities/Inventory'
import Interface from '@/entities/Interface'

export default class CreateDeviceRequest extends ZabbixRequest {
  host: ''
  name: ''
  description: ''
  groups: Array<Group> = []
  inventory: Inventory = new Inventory()
  interfaces: Array<Interface> = []

  constructor (method: string) {
    super()
    this.method = method
  }

  public getData (): object {
    return {
      jsonrpc: this.jsonrpc,
      method: this.method,
      id: this.id,
      auth: this.auth,
      params: {
        host: this.host,
        name: this.name,
        groups: this.groups,
        inventory: this.inventory,
        interfaces: this.interfaces
      }
    }
  }
}
