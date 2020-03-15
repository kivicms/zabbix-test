<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-info mb-5">
    <a
      class="navbar-brand"
      href="#"
    >Navbar</a>
    <button
      class="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#navbarSupportedContent"
      aria-controls="navbarSupportedContent"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon" />
    </button>

    <div
      id="navbarSupportedContent"
      class="collapse navbar-collapse"
    >
      <ul class="navbar-nav mr-auto">
        <li class="nav-item">
          <router-link
            to="/device-list"
            class="nav-link"
          >
            Список устройств
          </router-link>
        </li>
        <li class="nav-item">
          <router-link
            to="/map"
            class="nav-link"
          >
            Карта
          </router-link>
        </li>
        <li class="nav-item">
          <router-link
            to="/about"
            class="nav-link"
          >
            Описание приложения
          </router-link>
        </li>
      </ul>
    </div>
  </nav>
</template>
<script lang="ts">
/* eslint-disable */
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class DeviceMap extends Vue {

}
</script>

<style scoped>

</style>
