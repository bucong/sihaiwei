<template>
  <div class="index">
    <div class="banner">
      <img src="../../../static/img/banner.png" width="100%" alt="">
    </div>
    <h2>四海味点餐</h2>
    <ul>
      <li>
        <img src="../../../static/img/index-list1.png" alt="">
      </li>
      <li>
        <img src="../../../static/img/index-list2.png" alt="">
      </li>
      <li>
        <img src="../../../static/img/index-list3.png" alt="">
      </li>
      <li>
        <img src="../../../static/img/index-list4.png" alt="">
      </li>
      <li>
        <img src="../../../static/img/index-list5.png" alt="">
      </li>
      <li>
        <img src="../../../static/img/index-list6.png" alt="">
      </li>
    </ul>
    <div class="go-order"><router-link to="/order">开始点餐</router-link></div>
  </div>
</template>

<script>
import { fetch } from '@/util/fetch';
import { is_weixn_qq, getUrlParam, handleLocalStorage } from '@/util/common';
import { thridLoginUrl } from '@/util/projectData';
import { Toast, Indicator } from 'mint-ui';
export default {
  name: 'index',
  data () {
    return {

    }
  },
  created(){
    let code = getUrlParam('code');
    let userInfo = handleLocalStorage('get', 'userInfo');
    if(code && !userInfo){
      Indicator.open('正在登陆中...');
      fetch('get', 'user/login', {
        code: code,
        loginType: is_weixn_qq() === 'wx'?'wx':'qq',
        qqCallback: thridLoginUrl.qq
      }, (res)=>{
        handleLocalStorage('set', 'userInfo', JSON.stringify(res));
        Toast({
          message: '登录成功',
          position: 'bottom',
          duration: 1000
        });
        this.$router.push({path: '/order'});
      })
    }
  }
}
</script>

<style scoped>

</style>
