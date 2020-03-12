<template>
  <div class="row">
    <div class="col" />
    <div class="col-6">
      <h3>Авторизация</h3>
      <form>
        <div class="form-group">
          <label>Логин (Admin)</label>
          <input
            v-model="rpc.params.user"
            type="text"
            class="form-control"
          >
        </div>
        <div class="form-group">
          <label>Пароль (zabbix)</label>
          <input
            v-model="rpc.params.password"
            type="password"
            class="form-control"
          >
        </div>
        <div class="form-group">
          <button
            class="btn btn-outline-success"
            type="button"
            @click="onLogin"
          >
            Войти
          </button>
        </div>
      </form>
    </div>
    <div class="col" />
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
