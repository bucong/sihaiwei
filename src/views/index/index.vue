<template>
  <div class="index">
    <div class="banner">
      <img src="../../../static/img/banner.png" width="100%" alt="">
    </div>
    <h2>四海味点餐</h2>
    <ul>
      <li v-for="item in list">
        <img :src="IMG+item.img" alt="">
      </li>
    </ul>
    <div class="go-order"><router-link to="/order">开始点餐</router-link></div>
  </div>
</template>

<script>
import { fetch } from '@/util/fetch';
import { is_weixn_qq, getUrlParam, handleLocalStorage, changeTitle } from '@/util/common';
import { thridLoginUrl } from '@/util/projectData';
import { Toast, Indicator } from 'mint-ui';
import { IMG } from '@/util/projectData';
export default {
  name: 'index',
  data () {
    return {
      list: [],
      IMG: IMG
    }
  },
  created(){
    fetch('get', 'img/list', {
      imgType: 1
    }, (res)=>{
      this.list = res;
    });
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
    changeTitle('四海味点餐');
    //模拟登陆
    handleLocalStorage('set', 'userInfo', JSON.stringify({
      id: 3,
      name: '聪哥',
      figureurl: 'http://qzapp.qlogo.cn/qzapp/101479867/2807A306B0445956F956F2E29815E0B9/30'
    }));
  }
}
</script>

<style scoped>

</style>
