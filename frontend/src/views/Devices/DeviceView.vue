<template>
  <div class="card">
    <div class="card-header">
      Просмотр хоста:
      <router-link
        class="btn btn-sm btn-outline-dark float-right"
        to="/device-list"
      >
        <font-awesome-icon icon="arrow-left" />
      </router-link>
    </div>
    <div class="card-body">
      dfdf
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

  @Component
export default class DeviceView extends Vue {

}
</script>

<style scoped>

</style>
