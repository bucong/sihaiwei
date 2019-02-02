<template>
  <div class="admin-config">
    <h1>配置信息</h1>
    <ul>
      <li>
        <h5>七牛域名：</h5>
        <input type="text" v-model="imgURL" />
      </li>
    </ul>
    <div class="sub">
      <button @click="sub">提交</button>
    </div>
  </div>
</template>

<script>
import { changeTitle, handleLocalStorage } from '@/util/common';
import { fetch } from '@/util/fetch';
import { Toast, Indicator } from 'mint-ui';
export default {
  name: "admin-config",
  data() {
    return {
      imgURL: '', //七牛图片域名
    }
  },
  created(){
    changeTitle('配置信息');
    let config = JSON.parse(handleLocalStorage('get', 'configInfo'));
    console.log(config);
    this.imgURL = config.qiniuDomain;
  },
  methods:{
    sub(){
      fetch('post', 'config/save', {
        imgURL: this.imgURL
      }, res => {
        Toast({
          position: 'bottom',
          message: '修改成功'
        })
      })
    }
  }
}
</script>

<style scoped>

</style>
