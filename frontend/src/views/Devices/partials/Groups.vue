<template>
  <div>
    <ul class="list-group">
      <li v-for="g, index in entry.groups" v-bind:key="index" class="list-group-item">
        {{ g.name }}
      </li>
    </ul>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

  @Component
export default class Groups extends Vue {
    @Prop(Object) readonly entry: object | undefined
}
</script>

<style scoped>

</style>
