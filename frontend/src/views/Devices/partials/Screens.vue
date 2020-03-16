<template>
  <div>
    <ul class="list-group">
      <li
        v-for="s, index in screens"
        :key="index"
        class="list-group-item"
      >
        {{ s.name }}
      </li>
    </ul>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import Screen from '@/entities/Screen'

@Component
export default class Screens extends Vue {
    @Prop(Array) readonly screens: Array<Screen>
}
</script>

<style scoped>

</style>
