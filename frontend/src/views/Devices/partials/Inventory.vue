<template>
  <div>
    <dl class="row">
      <dt class="col-sm-3">
        Местоположение
      </dt>
      <dd class="col-sm-9">
        {{ entry.inventory.location }}
      </dd>

      <dt class="col-sm-3">
        Широта
      </dt>
      <dd class="col-sm-9">
        {{ entry.inventory.location_lat }}
      </dd>

      <dt class="col-sm-3">
        Долгота
      </dt>
      <dd class="col-sm-9">
        {{ entry.inventory.location_lon }}
      </dd>
    </dl>
    <hr>
    <em>Неупорядоченный список всех параметров из inventory</em>
    <dl class="row" v-for="a, i in all" v-bind:key="i">
      <dt class="col-sm-3">
        {{ a.key }}
      </dt>
      <dd class="col-sm-9">
        {{ a.val }}
      </dd>
    </dl>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

  @Component
export default class Inventory extends Vue {
    @Prop(Object) readonly entry: object
    all = []
    mounted (): void {
      for (const [key, value] of Object.entries(this.entry.inventory)) {
        // console.log(`${key}: ${value}`)
        this.all.push({ key: key, val: value })
      }
    }
}
</script>

<style scoped>

</style>
