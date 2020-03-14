<template>
  <div class="card">
    <div class="card-header">
      Редактирование хоста:
      <router-link
        class="btn btn-sm btn-outline-dark float-right"
        to="/device-list"
      >
        <font-awesome-icon icon="arrow-left" />
      </router-link>
    </div>
    <div
      v-if="isLoaded"
      class="card-body"
    >
      <form>
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
                v-model="entry.host"
                type="text"
                class="form-control"
                required
              >
            </div>

            <div class="form-group">
              <label>Название</label>
              <input
                v-model="entry.name"
                type="text"
                class="form-control"
                required
              >
            </div>

            <div class="form-group">
              <label>Группы</label>
              <v-select
                v-model="selectedGroups"
                :options="groups"
                :reduce="item => item.groupid"
                label="name"
                multiple
                taggable
              />
            </div>
            <div class="form-group">
              <label>Описание</label>
              <textarea
                v-model="entry.description"
                type="text"
                class="form-control"
              />
            </div>

            <div class="form-group">
              <label>Местоположение</label>
              <input
                v-model="entry.inventory.location"
                class="form-control"
                required
              >
            </div>

            <div class="form-group">
              <label>Широта</label>
              <input
                v-model="entry.inventory.location_lat"
                type="number"
                class="form-control"
                required
              >
            </div>

            <div class="form-group">
              <label>Долгота</label>
              <input
                v-model="entry.inventory.location_lon"
                type="number"
                class="form-control"
                required
              >
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col">
            <table class="table table-bordered table-hover">
              <thead>
                <tr>
                  <th>Тип интерфейса</th>
                  <th>DNS</th>
                  <th>IP</th>
                  <th>Port</th>
                  <th>Use IP</th>
                  <th>Main</th>
                  <th class="text-center">
                    <button
                      type="button"
                      class="btn btn-outline-success btn-sm"
                      @click="addInterface"
                    >
                      <font-awesome-icon icon="plus" />
                    </button>
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="i, iIndex in entry.interfaces"
                  :key="iIndex"
                >
                  <td>
                    <v-select
                      v-model="i.type"
                      :options="iTypes"
                      :reduce="item => item.value"
                    />
                  </td>
                  <td>
                    <input
                      v-model="i.dns"
                      type="text"
                    >
                  </td>
                  <td>
                    <input
                      v-model="i.ip"
                      type="text"
                    >
                  </td>
                  <td>
                    <input
                      v-model="i.port"
                      type="text"
                    >
                  </td>
                  <td>
                    <v-select
                      v-model="i.useip"
                      :options="[{label: 'Use DNS', value: '0'}, {label: 'Use IP', value: '1'}]"
                      :reduce="item => item.value"
                    />
                  </td>
                  <td>
                    <v-select
                      v-model="i.main"
                      :options="[{label: 'Нет', value: '0'}, {label: 'Да', value: '1'}]"
                      :reduce="item => item.value"
                    />
                  </td>
                  <td class="text-center">
                    <button
                      type="button"
                      class="btn btn-outline-danger btn-sm"
                      @click="removeInterface(iIndex)"
                    >
                      <font-awesome-icon icon="minus" />
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div class="form-group">
          <button
            type="button"
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
export default class DeviceUpdate extends Vue {
  isLoaded = false
  iTypes = [
    {
      label: 'Агент',
      value: '1'
    },
    {
      label: 'SNMP',
      value: '2'
    },
    {
      label: 'IPMI',
      value: '3'
    },
    {
      label: 'JMX',
      value: '4'
    }
  ]

  hostId = ''
  entry = {
    params: {}
  }

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

  private updateRpc = {
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

  private groups: Array<object> = []

  private errors: Array<string> = []

  private selectedGroups = []

  mounted (): void {
    const token: any = localStorage.getItem('token')
    this.groupsRpc.auth = token
    this.updateRpc.auth = token
    this.hostId = this.$route.params.id
    this.updateRpc.params.hostids = this.hostId
    this.fetchGroups()
    this.$axios.post('http://localhost:8888/api_jsonrpc.php', this.updateRpc).then(res => {
      this.entry = res.data.result[0]
      this.selectedGroups = res.data.result[0].groups
      this.isLoaded = true
    })
      .catch(error => {
        console.log(error)
      })
  }

  fetchGroups (): void {
    // eslint-disable-next-line
      const self = this
    this.$axios.post('http://localhost:8888/api_jsonrpc.php', this.groupsRpc)
      .then(response => {
        this.groups = response.data.result
      })
      .catch(error => {
        console.log(error)
      })
  }

  checkForm (event: any): void {
    if (!this.entry.host) {
      this.errors.push('Укажите хост')
    }

    if (!this.entry.name) {
      this.errors.push('Укажите название')
    }

    event.preventDefault()
  }

  addInterface (): void {
    this.entry.interfaces.push({
      type: 0,
      main: 0,
      useip: 0,
      ip: '',
      dns: '',
      port: 0
    })
  }

  removeInterface (id: number): void {
    console.log(id)
    this.entry.interfaces.splice(id, 1)
  }

  submit (event: any): void {
    this.errors = []
    this.checkForm(event)
    event.preventDefault()
    // eslint-disable-next-line
    let request = {
      jsonrpc: '2.0',
      method: 'host.update',
      params: {
        hostid: this.hostId,
        status: 0
        // ...this.entry,
        // groups: this.selectedGroups.map((item) => { return { groupid: item.groupid } })
      },
      auth: localStorage.getItem('token'),
      id: 3
    }

    this.$axios.post('http://localhost:8888/api_jsonrpc.php', request)
      .then(response => {
        if (response.data.error) {
          alert(response.data.error.data)
        } else {
          this.$router.push('/device-list')
        }
      })
      .catch(error => {
        console.log(error)
      })
  }
}
</script>
