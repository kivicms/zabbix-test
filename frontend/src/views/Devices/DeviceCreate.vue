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
              <label>Группы</label>
              <v-select
                v-model="selectedGroups"
                :options="groups"
                label="name"
                multiple
                taggable
              />
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
              <label>Местоположение</label>
              <input
                v-model="createRpc.params.inventory.location"
                type="text"
                class="form-control"
                required
              >
            </div>

            <div class="form-group">
              <label>Широта</label>
              <input
                v-model="createRpc.params.inventory.location_lat"
                type="number"
                class="form-control"
                required
              >
            </div>

            <div class="form-group">
              <label>Долгота</label>
              <input
                v-model="createRpc.params.inventory.location_lon"
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
                  v-for="i, iIndex in createRpc.params.interfaces"
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
                      :options="[{label: 'Use DNS', value: 0}, {label: 'Use IP', value: 1}]"
                      :reduce="item => item.value"
                    />
                  </td>
                  <td>
                    <v-select
                      v-model="i.main"
                      :options="[{label: 'Нет', value: 0}, {label: 'Да', value: 1}]"
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
  iTypes = [
    {
      label: 'Агент',
      value: 1
    },
    {
      label: 'SNMP',
      value: 2
    },
    {
      label: 'IPMI',
      value: 3
    },
    {
      label: 'JMX',
      value: 4
    }
  ]

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
      groups: [],
      // Описание интерфейса дано для упрощения
      interfaces: [
        /* {
          type: 1,
          main: 0,
          useip: 1,
          ip: '',
          dns: '',
          port: 10050
        } */
      ],
      inventory: {
        location: '',
        // eslint-disable-next-line
        location_lat: '',
        // eslint-disable-next-line
        location_lon: ''
      }
    },
    id: 2,
    auth: ''
  }

  private groups: Array<object> = []

  private errors: Array<string> = []

    private selectedGroups = []

    mounted (): void {
      const token: any = localStorage.getItem('token')
      this.groupsRpc.auth = token
      this.createRpc.auth = token
      this.fetchGroups()
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
      if (!this.createRpc.params.host) {
        this.errors.push('Укажите хост')
      }

      if (!this.createRpc.params.name) {
        this.errors.push('Укажите название')
      }
      event.preventDefault()
    }

    addInterface (): void {
      this.createRpc.params.interfaces.push({
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
      this.createRpc.params.interfaces.splice(id, 1)
    }

    submit (event: any): void {
      this.errors = []
      this.checkForm(event)
      event.preventDefault()
      // eslint-disable-next-line
      const self = this

      // eslint-disable-next-line
      self.createRpc.params.groups = this.selectedGroups.map((item) => { return { groupid: item.groupid } })

      this.$axios.post('http://localhost:8888/api_jsonrpc.php', this.createRpc)
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
