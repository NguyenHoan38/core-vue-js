<template>
    <component :is="template"></component>
</template>

<script>
import { STORE_KEY } from './_store/constants'
import store from './_store'
import ViewActiveEmail from './_views/Dashboard.vue'
export default {
  name: 'NewsModule',
  props: {
    template: String
  },
  components: {
    ViewActiveEmail
  },
  created () {
    console.log('STORE_KEY', this.$store)
    if (!(STORE_KEY in this.$store._modules.root._children)) {
      console.log('STORE_KEY', STORE_KEY)
      this.$store.registerModule(STORE_KEY, store)
    }
  }
}
</script>

<style lang="scss" scoped>
// @import "../../../assets/scss/style_2.css";
</style>
