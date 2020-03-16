<template>
  <div>
    <dl class="row">
      <dt class="col-sm-3">
        Местоположение
      </dt>
      <dd class="col-sm-9">
        {{ inventory.location }}
      </dd>

      <dt class="col-sm-3">
        Широта
      </dt>
      <dd class="col-sm-9">
        {{ inventory.location_lat }}
      </dd>

      <dt class="col-sm-3">
        Долгота
      </dt>
      <dd class="col-sm-9">
        {{ inventory.location_lon }}
      </dd>
    </dl>
    <hr>
    <em>Неупорядоченный список всех параметров из inventory</em>
    <dl
      v-for="param, i in allParams"
      :key="i"
      class="row"
    >
      <dt class="col-sm-3">
        {{ param.key }}
      </dt>
      <dd class="col-sm-9">
        {{ param.val }}
      </dd>
    </dl>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import Inventory from '@/entities/Inventory'

@Component
export default class DeviceInventory extends Vue {
    @Prop(Array) readonly inventory: Inventory

    allParams: Array<{ key: string; val: string}> = []
    mounted (): void {
      for (const [key, value] of Object.entries(this.inventory)) {
        this.allParams.push({ key: key, val: value })
      }
    }
}
</script>

<style scoped>

</style>
