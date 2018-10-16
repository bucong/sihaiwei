<template>
  <div id="app">
    <!--<keep-alive>-->
      <router-view/>
    <!--</keep-alive>-->
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>
body{
	margin: 0;
  background: #fff;
}
#app {
  font-family: PingFangSC-Regular, 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  margin: 0 auto;
  width: 7.5rem;
}
</style>
