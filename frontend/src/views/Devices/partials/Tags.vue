<template>
  <div>
    <ul class="list-group">
      <li
        v-for="g, index in entry.tags"
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
import IHost from '@/interfaces/IHost'

@Component
export default class Tags extends Vue {
    @Prop(Object) readonly entry: IHost | undefined
}
</script>

<style scoped>

</style>
