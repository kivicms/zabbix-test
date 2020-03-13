<template>
  <div class="card">
    <div class="card-header">
      Устройства
      <button
        class="btn btn-outline-info btn-sm float-right"
        @click="refreshDeviceList"
      >
        <font-awesome-icon icon="sync" />
      </button>
      <router-link
        class="btn btn-outline-success btn-sm float-right mr-2"
        to="create"
      >
        <font-awesome-icon icon="plus" />
      </router-link>
    </div>
    <div class="card-body">
      <div class="row">
        <div class="col-12">
          <table class="table table-hover table-bordered mt-2">
            <thead>
              <tr>
                <th class="text-center">#</th>
                <th class="text-center">Хост</th>
                <th class="text-center">Статус</th>
                <th class="text-center">Название</th>
                <th class="text-center" />
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="h, index in hosts"
                :key="index"
              >
                <td>{{ h.hostid }}</td>
                <td>{{ h.host }}</td>
                <td class="text-center"><status-badge :status="h.status" /></td>
                <td>{{ h.name }}</td>
                <td class="text-center">
                  <router-link
                    class="btn btn-sm btn-outline-info"
                    :to="'view/' + h.hostid"
                  >
                    <font-awesome-icon icon="eye" />
                  </router-link>
                  <router-link
                    class="btn btn-sm btn-outline-success ml-2"
                    :to="'update/' + h.hostid"
                  >
                    <font-awesome-icon icon="edit" />
                  </router-link>
                  <button
                    class="btn btn-sm btn-outline-danger ml-2"
                    @click="deleteDevice(h.hostid)"
                  >
                    <font-awesome-icon icon="trash" />
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import StatusBadge from '@/views/Devices/StatusBadge.vue'
@Component({
  components: { StatusBadge }
})
export default class DeviceList extends Vue {
    private rpc = {
      jsonrpc: '2.0',
      method: 'host.get',
      params: {
        output: 'extend'
      },
      auth: '',
      id: 1
    }

    private hosts: Array<object> = []

    mounted (): void {
      const token: any = localStorage.getItem('token')
      this.rpc.auth = token
      this.fetch()
    }

    fetch (): void {
      this.$axios.post('http://localhost:8888/api_jsonrpc.php', this.rpc).then(res => {
        this.hosts = res.data.result
      })
        .catch(error => {
          console.log(error)
        })
    }

    refreshDeviceList (): void {
      this.fetch()
    }

    deleteDevice (id: number): void {
      if (window.confirm('Удалить устройство?')) {
        console.log('delete device with id: ' + id)
        this.fetch()
      }
    }
}
</script>

<style scoped>

</style>
