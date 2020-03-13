<template>
  <div class="card">
    <div class="card-header">
      Добавить хост
      <router-link
        class="btn btn-sm btn-outline-dark float-right"
        to="/device-list"
      >
        <font-awesome-icon icon="arrow-left" />
      </router-link>
    </div>
    <div class="card-body">
      <form @submit="checkForm">
        <div v-if="errors.length">
          <b>Пожалуйста исправьте указанные ошибки:</b>
          <ul>
            <li
              v-for="error, eIndex in errors"
              :key="eIndex"
            >
              <span class="text-danger">{{ error }}</span>
            </li>
          </ul>
        </div>
        <div class="row">
          <div class="col">
            <div class="form-group">
              <label>Хост</label>
              <input
                v-model="createRpc.params.host"
                type="text"
                class="form-control"
                required
              >
            </div>

            <div class="form-group">
              <label>Название</label>
              <input
                v-model="createRpc.params.name"
                type="text"
                class="form-control"
                required
              >
            </div>

            <div class="form-group">
              <label>Описание</label>
              <textarea
                v-model="createRpc.params.description"
                type="text"
                class="form-control"
              />
            </div>

            <div class="form-group">
              <label>IP</label>
              <input
                v-model="createRpc.params.ip"
                type="text"
                class="form-control"
                required
              >
            </div>

            <div class="form-group">
              <label>Port</label>
              <input
                v-model="createRpc.params.port"
                type="text"
                class="form-control"
                required
              >
            </div>

            <div class="form-group">
              <label>SNMP read</label>
              <input
                type="text"
                class="form-control"
                required
              >
            </div>

            <div class="form-group">
              <label>SNMP write</label>
              <input
                type="text"
                class="form-control"
              >
            </div>

            <div class="form-group">
              <label>Широта</label>
              <input
                type="text"
                class="form-control"
                required
              >
            </div>

            <div class="form-group">
              <label>Долгота</label>
              <input
                type="text"
                class="form-control"
                required
              >
            </div>
          </div>
          <div class="col">
            <label>Группы</label>
            <div
              v-for="group, index in groups"
              :key="index"
              class="form-check"
            >
              <input
                id="defaultCheck1"
                class="form-check-input"
                type="checkbox"
                value=""
              >
              <label
                class="form-check-label"
                for="defaultCheck1"
              >
                {{ group.name }}
              </label>
            </div>
          </div>
        </div>
        <div class="form-group">
          <button
            type="submit"
            class="btn btn-outline-success"
            @click="submit"
          >
            <font-awesome-icon icon="save" />
            Сохранить
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

  @Component
export default class DeviceCreate extends Vue {
  private groupsRpc = {
    jsonrpc: '2.0',
    method: 'hostgroup.get',
    params: {
      output: 'extend',
      sortfield: 'name'
    },
    id: 1,
    auth: ''
  }

  private createRpc = {
    jsonrpc: '2.0',
    method: 'host.create',
    params: {
      host: null,
      name: null,
      description: null,
      ip: null,
      port: null,
      useip: 1,
      groups: [
        {
          groupid: 2
        },
        {
          groupid: 4
        }
      ]
    },
    id: 2,
    auth: ''
  }

  private groups: Array<object> = []

  private errors: Array<string> = []

  mounted (): void {
    const token: any = localStorage.getItem('token')
    this.groupsRpc.auth = token
    this.createRpc.auth = token
    this.fetchGroups()
  }

  fetchGroups (): void {
    this.$axios.post('http://localhost:8888/api_jsonrpc.php', this.groupsRpc)
      .then(response => {
        this.groups = response.data.result
      })
      .catch(error => {
        console.log(error)
      })
  }

  checkForm (event: any): void {
    if (!this.createRpc.params.host) {
      this.errors.push('Укажите хост')
    }

    if (!this.createRpc.params.name) {
      this.errors.push('Укажите название')
    }

    if (!this.createRpc.params.ip) {
      this.errors.push('Укажите IP-адрес')
    }

    if (!this.createRpc.params.host) {
      this.errors.push('Укажите порт')
    }

    event.preventDefault()
  }

  submit (event: any): void {
    this.errors = []
    this.checkForm(event)
    event.preventDefault()
    console.log('save')
  }
}
</script>
