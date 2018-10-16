<template>
  <div class="admin">
    <div class="header">
      我是头部
    </div>
    <div>
      <div class="side-bar">
        左侧导航
      </div>
      <div>
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'admin'
}
</script>

<style scoped>

</style>
