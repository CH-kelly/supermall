<template>
  <div id="app">
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
    <tab-bar></tab-bar>
  </div>
</template>

<script>
  import TabBar from "components/common/tabbar/TabBar"
  export default {
    name: 'App',
    components: {
      TabBar
    },
  }
</script>

<style lang="stylus">
@import "assets/css/base.css"
  @import "assets/css/tabbar.css"
</style>
