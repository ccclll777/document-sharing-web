<template>
  <div>
    <div :class="{'fixed-header':fixedHeader}">
      <navbar />
    </div>
    <app-main />
  </div>
</template>

<script>
import { Navbar, AppMain } from '../components'

export default {
  components: {
    Navbar,
    AppMain
  },
  computed: {
    fixedHeader() {
      return this.$store.state.settings.fixedHeader
    }
  }
}
</script>

<style lang="scss" scoped>

  .fixed-header {
    position: fixed;
    top: 0;
    right: 0;
    z-index: 9;
    width: 100%;
    transition: width 0.28s;
  }

</style>
