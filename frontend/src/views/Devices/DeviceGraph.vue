<template>
  <div class="card">
    <div class="card-header">
      graph
    </div>
    <div class="card-body">
      graph
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class DeviceGraph extends Vue {
  isLoaded = false
  hostId = ''
  graphId = ''
  entry = {
    params: {}
  }

  private graphRpc = {
    jsonrpc: '2.0',
    method: 'graph.get',
    params: {
      output: 'extends',
      graphids: '',
      hostids: '',
      selectGraphItems: 'extends'
    },
    auth: '',
    id: 1
  }

  mounted (): void {
    const token: any = localStorage.getItem('token')
    this.graphRpc.auth = token
    this.graphRpc.params.hostids = this.$route.params.id
    this.graphRpc.params.graphids = this.$route.params.graphId
    this.$axios.post('http://localhost:8888/api_jsonrpc.php', this.graphRpc).then(res => {
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
