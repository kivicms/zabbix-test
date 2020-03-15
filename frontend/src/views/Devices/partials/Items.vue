<template>
  <div>
    <ul class="list-group">
      <li v-for="g, index in entry.items" v-bind:key="index" class="list-group-item">
        {{ g.name }}
      </li>
    </ul>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class Items extends Vue {
  @Prop(Object) readonly entry: object
}
</script>

<style scoped>

</style>
