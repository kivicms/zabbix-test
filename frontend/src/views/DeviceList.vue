<template>
  <div class="card">
    <div class="card-header">
      Устройства
      <button
        v-show="isAuthorized"
        class="btn btn-outline-info btn-sm float-right"
        @click="refreshDeviceList"
      >
        <font-awesome-icon icon="sync" />
      </button>
      <button
        v-show="isAuthorized"
        class="btn btn-outline-success btn-sm float-right mr-2"
      >
        <font-awesome-icon icon="plus" />
      </button>
    </div>
    <div class="card-body">
      <div class="row">
        <div class="col-12 text-center">
          <p class="text-danger">
            Чтобы просмотреть список хостов требуется авторизация
          </p>
        </div>
        <div class="col-12">
          <table class="table table-hover table-bordered mt-2">
            <thead>
              <tr>
                <th>#</th>
                <th>Устройство</th>
                <th>Статус</th>
                <th>Название</th>
                <th />
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="h, index in hosts"
                :key="index"
              >
                <td>{{ h.hostid }}</td>
                <td>{{ h.host }}</td>
                <td>{{ h.status }}</td>
                <td>{{ h.name }}</td>
                <td class="text-center">
                  <button class="btn btn-sm btn-outline-info">
                    <font-awesome-icon icon="eye" />
                  </button>
                  <button class="btn btn-sm btn-outline-success ml-2">
                    <font-awesome-icon icon="edit" />
                  </button>
                  <button class="btn btn-sm btn-outline-danger ml-2">
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

  @Component
export default class DeviceList extends Vue {
    rpc = {
      jsonrpc: '2.0',
      method: 'host.get',
      params: {
        output: 'extend'
      },
      auth: '',
      id: 1
    }

    isAuthorized = false

    hosts = {}

    mounted (): void {
      const token = localStorage.getItem('token')
      if (token) {
        this.rpc.auth = token
        this.isAuthorized = true
      } else {
        this.isAuthorized = false
      }
    }

    refreshDeviceList (): void {
      this.$axios.post('http://localhost:8888/api_jsonrpc.php', this.rpc).then(res => {
        this.hosts = res.data.result
      })
        .catch(error => {
          console.log(error)
        })
    }
}
</script>

<style scoped>

</style>
