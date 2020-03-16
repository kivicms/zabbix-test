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
    <dl
      v-for="a, i in all"
      :key="i"
      class="row"
    >
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
import IHost from '@/interfaces/IHost'

@Component
export default class Inventory extends Vue {
    @Prop(Object) readonly entry: IHost | undefined

    all: Array<{ key: string; val: string}> = []
    mounted (): void {
      for (const [key, value] of Object.entries((this.entry as IHost).inventory)) {
        this.all.push({ key: key, val: value })
      }
    }
}
</script>

<style scoped>

</style>
