<template>
  <div class="container">
    <the-header></the-header>
    <router-view />
  </div>
</template>
<script>
import TheHeader from './TheHeader'

export default {
  name: 'TheContainer',
  components: { TheHeader }
}
</script>

<style scoped>

</style>
