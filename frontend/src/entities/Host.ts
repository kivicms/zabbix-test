import Inventory from '@/entities/Inventory'
import Interface from '@/entities/Interface'

export default class Host {
  public hostid = ''
  public host = ''
  public status = ''
  public name = ''
  public description = ''
  public inventory: Inventory
  public interfaces: Array<Interface>

  constructor (hostid: string, host: string, status: string, name: string, description: string, inventory: Inventory, interfaces: Array<Interface>) {
    this.hostid = hostid
    this.host = host
    this.status = status
    this.name = name
    this.description = description
    this.inventory = inventory
    this.interfaces = interfaces
  }
}
