import IInventory from '@/interfaces/IInventory'
import IInterface from '@/interfaces/IInterface'

export default class Host {
  public hostid = '';
  public host = '';
  public status = '';
  public name = '';
  public description = '';
  public inventory: IInventory
  public interfaces: Array<IInterface>
}
