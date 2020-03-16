<template>
  <div class="container d-flex justify-content-center align-items-center min-vh-100">
    <div class="row justify-content-center">
      <div class="col-auto">
        <div class="card">
          <div class="card-header">
            Авторизация
          </div>
          <div class="card-body">
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
        </div>
        <p
          v-if="loginError"
          class="text-danger"
        >
          {{ errorMessage }}
        </p>
        <p
          v-show="isAutorized"
          class="text-success"
        >
          Вы успешно авторизованы и можете перейти к списку хостов
        </p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

  @Component
export default class DeviceList extends Vue {
    errorMessage = ''
    loginError = false
    isAutorized = false

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
      this.$axios.post('http://localhost:8888/api_jsonrpc.php', this.rpc).then(res => {
        if (!res.data.error) {
          localStorage.setItem('token', res.data.result)
          localStorage.setItem('username', this.rpc.params.user)
          this.isAutorized = true
          Vue.prototype.$api = Vue.prototype.$zabbixClient.login(this.rpc.params.user, this.rpc.params.password)
          this.$router.push('/device-list')
        } else {
          this.loginError = true
          this.errorMessage = res.data.error.data
        }
      })
        .catch(error => {
          console.log(error)
        })
    }
}
</script>

<style scoped>

</style>
