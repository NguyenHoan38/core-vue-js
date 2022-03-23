<template>
  <div id="app">
    <!-- <component :is="layout">
      <router-view />
    </component> -->
      <router-view class="basepage" />
  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'
const defaultLayout = 'default'
export default {
  name: 'App',
  // components: {
  //   HelloWorld
  // }
  computed: {
    layout () {
      return (this.$route.meta.layout || defaultLayout) + '-layout'
    }
  }
}
</script>

<style>
/* #app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
} */
</style>
