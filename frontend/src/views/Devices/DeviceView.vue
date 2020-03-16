<template>
  <div
    v-if="isLoaded"
    class="card"
  >
    <div class="card-header">
      Данные хоста: <strong>{{ entry.name }}</strong>
      <router-link
        class="btn btn-sm btn-outline-dark float-right"
        to="/device-list"
      >
        <font-awesome-icon icon="arrow-left" />
      </router-link>
    </div>
    <div class="card-body">
      <div>
        <b-tabs content-class="mt-3">
          <b-tab
            title="Главное"
            active
          >
            <device :entry="entry" />
          </b-tab>
          <b-tab title="Группы">
            <groups :groups="entry.groups" />
          </b-tab>
          <b-tab title="Inventory">
            <device-inventory :inventory="entry.inventory" />
          </b-tab>
          <b-tab title="Items">
            <items :items="entry.items" />
          </b-tab>
          <b-tab title="Приложения">
            <applications :applications="entry.applications" />
          </b-tab>
          <b-tab title="Графики">
            <graphs :graphs="entry.graphs" :host-id="entry.hostid" />
          </b-tab>
          <b-tab title="Discoveries">
            <discoveries :discoveries="entry.discoveries" />
          </b-tab>
          <b-tab title="Screens">
            <screens :entry="entry" />
          </b-tab>
          <b-tab title="Tags">
            <tags :entry="entry" />
          </b-tab>
        </b-tabs>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import Device from './partials/Device.vue'
import Discoveries from '@/views/Devices/partials/Discoveries.vue'
import Graphs from '@/views/Devices/partials/Graphs.vue'
import Groups from '@/views/Devices/partials/Groups.vue'
import Screens from '@/views/Devices/partials/Screens.vue'
import Tags from '@/views/Devices/partials/Tags.vue'
import Items from '@/views/Devices/partials/Items.vue'
import Applications from '@/views/Devices/partials/Applications.vue'
import Host from '@/entities/Host'
import DeviceInventory from '@/views/Devices/partials/DeviceInventory.vue'

  @Component({
    components: {
      DeviceInventory,
      Applications,
      Items,
      Device,
      Discoveries,
      Graphs,
      Groups,
      Screens,
      Tags
    }
  })
export default class DeviceView extends Vue {
    isLoaded = false
    hostId = ''
    entry: Host

    private viewRpc = {
      jsonrpc: '2.0',
      method: 'host.get',
      params: {
        output: 'extend',
        hostids: '',
        selectInterfaces: 'extend',
        selectGroups: 'extend',
        selectInventory: 'extend',
        selectApplications: 'extend',
        selectDiscoveries: 'extend',
        selectGraphs: 'extend',
        selectHostDiscovery: 'extend',
        selectItems: 'extend',
        selectScreens: 'extend',
        selectTags: 'extend'
      },
      auth: '',
      id: 1
    }

    mounted (): void {
      const token: any = localStorage.getItem('token')
      this.viewRpc.auth = token
      this.hostId = this.$route.params.id
      this.viewRpc.params.hostids = this.hostId
      this.$axios.post('http://localhost:8888/api_jsonrpc.php', this.viewRpc).then(res => {
        this.entry = res.data.result[0] as Host
        this.isLoaded = true
      })
        .catch(error => {
          console.log(error)
        })
    }
}
</script>
