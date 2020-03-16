<template>
  <div
    v-if="isReady"
    class="card"
  >
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
                v-model="createDeviceRequest.host"
                type="text"
                class="form-control"
                required
              >
            </div>

            <div class="form-group">
              <label>Название</label>
              <input
                v-model="createDeviceRequest.name"
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
                v-model="createDeviceRequest.description"
                type="text"
                class="form-control"
              />
            </div>

            <div class="form-group">
              <label>Местоположение</label>
              <input
                v-model="createDeviceRequest.inventory.location"
                type="text"
                class="form-control"
                required
              >
            </div>

            <div class="form-group">
              <label>Широта</label>
              <input
                v-model="createDeviceRequest.inventory.location_lat"
                type="number"
                class="form-control"
                required
              >
            </div>

            <div class="form-group">
              <label>Долгота</label>
              <input
                v-model="createDeviceRequest.inventory.location_lon"
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
                  v-for="i, iIndex in createDeviceRequest.interfaces"
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
import Group from '@/entities/Group'
import Interface from '@/entities/Interface'
import CreateDeviceRequest from '@/request/CreateDeviceRequest'

  @Component
export default class DeviceCreate extends Vue {
  isReady = false
    iTypes = [
      {
        text: 'Агент',
        value: 1
      },
      {
        text: 'SNMP',
        value: 2
      },
      {
        text: 'IPMI',
        value: 3
      },
      {
        text: 'JMX',
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

    private createDeviceRequest: CreateDeviceRequest = new CreateDeviceRequest('host.create')

    private groups: Array<Group> = []

    private errors: Array<string> = []

    private selectedGroups = []

    mounted (): void {
      const token: string = localStorage.getItem('token') ?? ''
      this.groupsRpc.auth = token
      this.fetchGroups()
    }

    fetchGroups (): void {
      // eslint-disable-next-line
      const self = this
      this.$axios.post('http://localhost:8888/api_jsonrpc.php', this.groupsRpc)
        .then(response => {
          this.groups = response.data.result
          this.isReady = true
        })
        .catch(error => {
          console.log(error)
        })
    }

    checkForm (event: Event): void {
      if (!this.createDeviceRequest.host) {
        this.errors.push('Укажите хост')
      }

      if (!this.createDeviceRequest.name) {
        this.errors.push('Укажите название')
      }
      event.preventDefault()
    }

    addInterface (): void {
      this.createDeviceRequest.interfaces.push(new Interface('0', '0', '0', '', '', '10050'))
    }

    removeInterface (id: number): void {
      console.log(id)
      this.createDeviceRequest.interfaces.splice(id, 1)
    }

    submit (event: Event): void {
      this.errors = []
      this.checkForm(event)
      event.preventDefault()
      this.createDeviceRequest.groups = this.selectedGroups.map((item: Group) => {
        return new Group(item.groupid)
      })

      this.$axios.post('http://localhost:8888/api_jsonrpc.php', this.createDeviceRequest.getData()
      )
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
