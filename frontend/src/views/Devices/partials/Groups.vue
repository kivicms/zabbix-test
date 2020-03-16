<template>
  <div>
    <ul class="list-group">
      <li
        v-for="group, index in groups"
        :key="index"
        class="list-group-item"
      >
        {{ group.name }}
      </li>
    </ul>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import Group from '@/entities/Group'

  @Component
export default class Groups extends Vue {
    @Prop({ type: Array }) groups: Array<Group>
}
</script>

<style scoped>

</style>
