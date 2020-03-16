<template>
  <div>
    <ul class="list-group">
      <li
        v-for="g, index in graphs"
        :key="index"
        class="list-group-item"
      >
        {{ g.name }}
        <button
          type="button"
          class="btn btn-sm btn-outline-dark float-right"
          @click="showGraph(g.graphid)"
        >
          <font-awesome-icon icon="arrow-right" />
        </button>
      </li>
    </ul>
    <b-modal
      id="graph-modal"
      v-model="showModal"
      size="xl"
      hide-footer
    >
      <template v-slot:modal-title>
        График
      </template>
      <graph-modal
        :graph-id="graphId"
        :host-id="hostId"
        :show-modal="showModal"
      />
    </b-modal>
  </div>
</template>
<script lang='ts'>
import { Component, Prop, Vue } from 'vue-property-decorator'
import GraphModal from '@/views/Devices/partials/GraphModal.vue'
import Graph from '@/entities/Graph'

@Component({ components: { GraphModal } })
export default class Graphs extends Vue {
  @Prop({ type: Array }) readonly graphs: Array<Graph>
  @Prop(String) readonly hostId: string
  graphId = ''
  showModal = false

  showGraph (graphId: string): void {
    this.graphId = graphId
    this.showModal = true
  }
}
</script>

<style scoped>
</style>
