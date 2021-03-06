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
                    <b-form-select
                      v-model="i.type"
                      :options="iTypes"
                      :reduce="item => item.value"
                      class="form-control"
                    />
                  </td>
                  <td>
                    <input
                      v-model="i.dns"
                      type="text"
                      class="form-control"
                    >
                  </td>
                  <td>
                    <input
                      v-model="i.ip"
                      type="text"
                      class="form-control"
                    >
                  </td>
                  <td>
                    <input
                      v-model="i.port"
                      type="text"
                      class="form-control"
                    >
                  </td>
                  <td>
                    <b-form-select
                      v-model="i.useip"
                      :options="[{text: 'Use DNS', value: 0}, {text: 'Use IP', value: 1}]"
                      :reduce="item => item.value"
                      class="form-control"
                    />
                  </td>
                  <td>
                    <b-form-select
                      v-model="i.main"
                      :options="[{text: 'Нет', value: 0}, {text: 'Да', value: 1}]"
                      :reduce="item => item.value"
                      class="form-control"
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
import Host from '@/entities/Host'
import Interface from '@/entities/Interface'
import Group from '@/entities/Group'

  @Component
export default class DeviceUpdate extends Vue {
  isLoaded = false
  iTypes = [
    {
      text: 'Агент',
      value: '1'
    },
    {
      text: 'SNMP',
      value: '2'
    },
    {
      text: 'IPMI',
      value: '3'
    },
    {
      text: 'JMX',
      value: '4'
    }
  ]

  hostId = ''
  entry: Host

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

  private groups: Array<Group> = []

  private errors: Array<string> = []

  private selectedGroups = []

  mounted (): void {
    const token: string = localStorage.getItem('token') ?? ''
    this.groupsRpc.auth = token
    this.updateRpc.auth = token
    this.hostId = this.$route.params.id
    this.updateRpc.params.hostids = this.hostId
    this.fetchGroups()
    this.$axios.post('http://localhost:8888/api_jsonrpc.php', this.updateRpc).then(res => {
      this.entry = res.data.result[0]
      this.selectedGroups = res.data.result[0].groups.map((item: Group) => { return item.groupid })
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

  checkForm (event: Event): void {
    if (!this.entry.host) {
      this.errors.push('Укажите хост')
    }

    if (!this.entry.name) {
      this.errors.push('Укажите название')
    }

    event.preventDefault()
  }

  addInterface (): void {
    this.entry.interfaces.push(new Interface('0', '0', '0', '', '', ''))
  }

  removeInterface (id: number): void {
    console.log(id)
    this.entry.interfaces.splice(id, 1)
  }

  submit (event: Event): void {
    this.errors = []
    this.checkForm(event)
    event.preventDefault()
    // eslint-disable-next-line
    let request = {
      jsonrpc: '2.0',
      method: 'host.update',
      params: {
        hostid: this.hostId,
        host: this.entry.host,
        name: this.entry.name,
        description: this.entry.description,
        inventory: {
          location: this.entry.inventory.location,
          // eslint-disable-next-line
          location_lat: this.entry.inventory.location_lat,
          // eslint-disable-next-line
          location_lon: this.entry.inventory.location_lon
        },
        interfaces: this.entry.interfaces,
        groups: this.selectedGroups.map((item: Group) => { return { groupid: item } })
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
