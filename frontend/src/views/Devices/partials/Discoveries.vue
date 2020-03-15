<template>
  <div>
    <ul class="list-group">
      <li
        v-for="g, index in entry.discoveries"
        :key="index"
        class="list-group-item"
      >
        {{ g.name }}
      </li>
    </ul>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class Discovery extends Vue {
    @Prop(Object) readonly entry: object
}
</script>

<style scoped>

</style>
