<template>
  <div>
    <ul class="list-group">
      <li
        v-for="app, index in applications"
        :key="index"
        class="list-group-item"
      >
        {{ app.name }}
      </li>
    </ul>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import Application from '@/entities/Application'

@Component
export default class Applications extends Vue {
  @Prop({ type: Array }) readonly applications: Array<Application>
}
</script>
