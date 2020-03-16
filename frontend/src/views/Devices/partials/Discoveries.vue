<template>
  <div>
    <ul class="list-group">
      <li
        v-for="d, index in discoveries"
        :key="index"
        class="list-group-item"
      >
        {{ d.name }}<br>
        <small>{{ d.description }}</small>
      </li>
    </ul>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import Discovery from '@/entities/Discovery'

@Component
export default class Discoveries extends Vue {
  @Prop({ type: Array }) readonly discoveries: Array<Discovery>
}
</script>

<style scoped>

</style>
