import IInventory from '@/interfaces/IInventory'
import ITag from '@/interfaces/ITag'
import IInterface from '@/interfaces/IInterface'

export default interface IHost {
  hostid: string;
  host: string;
  status: string;
  name: string;
  description: string

  inventory: IInventory
  interfaces: Array<IInterface>
  tags: Array<ITag>
}
