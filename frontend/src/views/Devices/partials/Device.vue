<template>
  <dl class="row">
    <dt class="col-sm-3">
      HostId
    </dt>
    <dd class="col-sm-9">
      {{ entry.hostid }}
    </dd>

    <dt class="col-sm-3">
      Host
    </dt>
    <dd class="col-sm-9">
      {{ entry.host }}
    </dd>

    <dt class="col-sm-3">
      Name
    </dt>
    <dd class="col-sm-9">
      {{ entry.name }}
    </dd>

    <dt class="col-sm-3">
      Error
    </dt>
    <dd class="col-sm-9">
      {{ entry.error }}
    </dd>
  </dl>
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

  @Component
export default class Device extends Vue {
    @Prop(Object) readonly entry: object | undefined
}
</script>

<style scoped>

</style>
