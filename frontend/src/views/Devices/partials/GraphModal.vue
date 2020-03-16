<template>
  <div class="graph-container">
    тут должен быть график
  </div>
</template>

<script lang='ts'>
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class GraphModal extends Vue {
    @Prop({ type: String, default: '' }) hostId: string
    @Prop({ type: String, default: '' }) graphId: string

    entry = []
    isLoaded = false
    private graphRpc = {
      jsonrpc: '2.0',
      method: 'graph.get',
      params: {
        output: 'extends',
        expandData: 1,
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
      this.graphRpc.params.hostids = this.hostId
      this.graphRpc.params.graphids = this.graphId
      this.$axios
        .post('http://localhost:8888/api_jsonrpc.php', this.graphRpc)
        .then(res => {
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
  .graph-container {
    width: 100%;
    height: 480px;
    margin: 0 auto;
    background: gray;
  }
</style>
