<template>
  <div class="card">
    <div class="card-header">
      Просмотр хоста:
      <router-link
        class="btn btn-sm btn-outline-dark float-right"
        to="/device-list"
      >
        <font-awesome-icon icon="arrow-left" />
      </router-link>
    </div>
    <div class="card-body" v-if="isLoaded">
      dfdf
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

  @Component
export default class DeviceView extends Vue {
    isLoaded = false
    hostId = ''
    entry = {
      params: {}
    }

    private viewRpc = {
      jsonrpc: '2.0',
      method: 'host.get',
      params: {
        output: 'extend',
        hostids: '',
        selectInterfaces: 'extend',
        selectGroups: 'extend',
        selectInventory: 'extend'
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
        this.entry = res.data.result[0]
        this.isLoaded = true
      })
        .catch(error => {
          console.log(error)
        })
    }
}
</script>

<style scoped>

</style>
