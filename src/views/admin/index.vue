<template>
  <div class="admin">
    <div class="header">
      <img src="../../../static/img/logo/logo.png" alt="">
      <h5>四海味后台管理</h5>
    </div>
    <div class="admin-body">
      <div class="side-bar">
        <ul>
          <li>
            <router-link to="/admin/home">
              <i class="iconfont">&#xe61a;</i>
              <p>订单</p>
            </router-link>
          </li>
          <li>
            <router-link to="/admin/commodity">
              <i class="iconfont">&#xe76a;</i>
              <p>商品</p>
            </router-link>
          </li>
          <li>
            <router-link to="/admin/add">
              <i class="iconfont">&#xe66e;</i>
              <p>新增</p>
            </router-link>
          </li>
        </ul>
      </div>
      <div class="admin-content">
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
