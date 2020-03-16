<template>
  <div>
    <ul class="list-group">
      <li v-for="item, index in items" v-bind:key="index" class="list-group-item">
        {{ item.name }}
      </li>
    </ul>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import Item from '@/entities/Item'

@Component
export default class Items extends Vue {
  @Prop({ type: Array }) readonly items: Array<Item>
}
</script>
