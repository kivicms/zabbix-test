<template>
  <div>
    <ul class="list-group">
      <li
        v-for="t, index in tags"
        :key="index"
        class="list-group-item"
      >
        {{ t.name }}
      </li>
    </ul>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import Tag from '@/entities/Tag'

  @Component
export default class Tags extends Vue {
    @Prop(Array) readonly tags: Array<Tag>
}
</script>

<style scoped>

</style>
