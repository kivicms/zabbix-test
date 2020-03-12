<template>
  <div class="row">
    <div class="col">
      add device
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

  @Component
export default class DeviceList extends Vue {
    login = ''
    password = ''

    rpc = {
      jsonrpc: '2.0',
      method: 'user.login',
      params: {
        user: '',
        password: ''
      },
      id: 1
    }

    onLogin (): void {
      this.$axios.post('localhost', this.rpc).then(res => {
        console.log(res)
      })
        .catch(error => {
          console.log(error)
        })
    }
}
</script>

<style scoped>

</style>
