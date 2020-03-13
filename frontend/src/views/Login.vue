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
    <div class="col" />
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
          this.isAutorized = true
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
