import Inventory from '@/entities/Inventory'
import Interface from '@/entities/Interface'
import Application from '@/entities/Application'
import Group from '@/entities/Group'
import Item from '@/entities/Item'
import Discovery from '@/entities/Discovery'
import Graph from '@/entities/Graph'

export default class Host {
  public hostid = ''
  public host = ''
  public status = ''
  public name = ''
  public description = ''
  public disable_until = ''
  public error = ''
  public available = ''
  public errors_from = ''
  public lastaccess = ''
  public ipmi_authtype = ''
  public ipmi_privilege = ''
  public ipmi_username = ''
  public ipmi_password = ''
  public ipmi_disable_until = ''
  public ipmi_available = ''
  public snmp_disable_until = ''
  public snmp_available = ''
  public maintenanceid = ''
  public maintenance_status = ''
  public maintenance_type = ''
  public maintenance_from = ''
  public ipmi_errors_from = ''
  public snmp_errors_from = ''
  public ipmi_error = ''
  public snmp_error = ''
  public jmx_disable_until = ''
  public jmx_available = ''
  public jmx_errors_from = ''
  public jmx_error = ''
  public flags = ''
  public templateid = ''
  public tls_connect = ''
  public tls_accept = ''
  public tls_issuer = ''
  public tls_subject = ''
  public tls_psk_identity = ''
  public tls_psk = ''
  public proxy_address = ''
  public auto_compress = ''
  public inventory_mode = ''

  public groups: Array<Group>
  public inventory: Inventory
  public items: Array<Item>
  public graphs: Array<Graph>
  public discoveries: Array<Discovery>
  public interfaces: Array<Interface>
  public applications: Array<Application>
}
