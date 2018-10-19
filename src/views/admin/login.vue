<template>
  <div class="admin-login">
    <div class="logo">
      <img src="../../../static/img/logo/logo-big.png" alt="">
    </div>
    <ul class="input-box">
      <li class="flex">
        <span>账号：</span>
        <input type="text" placeholder="请输入管理员账号" v-model="account" />
      </li>
      <li class="flex">
        <span>密码：</span>
        <input type="password" placeholder="请输入管理员密码" v-model="password" />
      </li>
    </ul>
    <div class="sub">
      <button @click="sub">确定</button>
    </div>
  </div>
</template>

<script>
import { Toast } from 'mint-ui';
import { fetch } from '@/util/fetch';
import { handleLocalStorage, changeTitle } from '@/util/common';
export default {
  name: "admin-login",
  data(){
    return {
      account: '',
      password: ''
    }
  },
  created(){
    changeTitle('管理员登陆');
  },
  methods:{
    sub(){
      if(this.account === ''){
        Toast({message: "请填写管理员账号",duration: 1500});
      }else if(this.password === ''){
        Toast({message: "请填写管理员密码",duration: 1500});
      }else{
        fetch('post', 'admin/login', {
          account: this.account,
          password: this.password
        }, (res)=>{
          handleLocalStorage('set', 'adminInfo', JSON.stringify(res));
          this.$router.push({path: '/admin'});
        })
      }
    }
  }
}
</script>

<style scoped>

</style>
