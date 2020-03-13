<template>
  <div class="card">
    <div class="card-header">
      Редактирование хоста:
      <router-link class="btn btn-sm btn-outline-dark float-right" to="/device-list"><font-awesome-icon icon="arrow-left"></font-awesome-icon> </router-link>
    </div>
    <div class="card-body">
      <form>
      </form>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

  @Component
export default class DeviceUpdate extends Vue {

}
</script>
