<template>
  <div class="mb-4">
    <b-navbar
      toggleable="lg"
      type="dark"
      variant="info"
    >
      <b-navbar-brand to="/device-list">
        ZabbixTest
      </b-navbar-brand>

      <b-navbar-toggle target="nav-collapse" />

      <b-collapse
        id="nav-collapse"
        is-nav
      >
        <b-navbar-nav>
          <b-nav-item to="/device-list">
            Главная
          </b-nav-item>
          <b-nav-item to="/map">
            Карта
          </b-nav-item>
        </b-navbar-nav>
        <b-navbar-nav class="ml-auto">
          <b-nav-item to="/about">
            Описание приложения
          </b-nav-item>
          <b-nav-item-dropdown right>
            <template v-slot:button-content>
              <em>{{ UserName }}</em>
            </template>
            <b-dropdown-item to="/profile">
              <font-awesome-icon icon="user" />
              Профиль
            </b-dropdown-item>
            <b-dropdown-item @click="signOut">
              <font-awesome-icon icon="sign-out-alt" />
              Выход
            </b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>
<script lang="ts">
/* eslint-disable */
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class DeviceMap extends Vue {
  signOut() {
    localStorage.removeItem('token')
    localStorage.removeItem('username')
    this.$router.push('/login')
  }

  get UserName (): string {
    const username = localStorage.getItem('username')
    return username ?? ''
  }
}
</script>

<style scoped>

</style>
