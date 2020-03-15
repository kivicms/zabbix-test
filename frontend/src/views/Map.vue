<template>
  <div class="card">
    <div class="card-header">
      Карта расположение устройств
    </div>
    <div
      v-if="isLoaded"
      class="card-body"
    >
      <GmapMap
        :center="{lat:10, lng:10}"
        :zoom="7"
        map-type-id="terrain"
        style="width: 100%; height: 600px"
      >
        <GmapMarker
          v-for="(m, index) in markers"
          :key="index"
          :position="m.position"
          :clickable="true"
          :draggable="true"
          @click="center=m.position"
        />
      </GmapMap>
    </div>
  </div>
</template>

<script lang="ts">
/* eslint-disable */
import { Component, Vue } from 'vue-property-decorator'

  @Component
export default class DeviceMap extends Vue {
  isLoaded = false
  entries = []
    private rpc = {
      jsonrpc: '2.0',
      method: 'host.get',
      params: {
        output: ['hostid', 'name', 'host'],
        selectInventory: ['location', 'location_lat', 'location_lon']
      },
      auth: '',
      id: 1
    }

    markers = []

    mounted (): void {
      const token: any = localStorage.getItem('token')
      this.rpc.auth = token
      this.fetch()
    }

    fetch () {
      this.$axios.post('http://localhost:8888/api_jsonrpc.php', this.rpc).then(response => {
        const self = this
        response.data.result.forEach(function(item) {

          if (item.inventory.location !== undefined) {
            self.markers.push ({
              location: item.inventory.location,
              position: {
                lat: parseFloat(item.inventory.location_lat),
                lng: parseFloat(item.inventory.location_lon)
              }
            })
          }
        })

        this.isLoaded = true
      })
        .catch(error => {
          console.log(error)
        })
    }
}
</script>

<style scoped>
  .vue-map-container {
    width: 100%;
    height: 480px;
    margin: 0 auto;
    background: gray;
  }
</style>
