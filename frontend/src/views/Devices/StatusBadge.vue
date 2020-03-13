<template>
  <span :class="'badge badge-lg ' + badgeClass">{{ text }}</span>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class DeviceCreate extends Vue {
  private badgeClass = 'badge-success'
  private text = 'Включен'

  @Prop({ default: 0 }) readonly status: number | undefined
}
</script>

<style scoped>

</style>
