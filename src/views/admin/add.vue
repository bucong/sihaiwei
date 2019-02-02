<template>
  <div class="admin-add">
    <h3>新增菜品</h3>
    <ul>
      <li>
        <p>类别：</p>
        <select name="" v-model="addType">
          <option value="1">主食</option>
          <option value="2">海鲜</option>
          <option value="3">配菜</option>
          <option value="4">饮品</option>
        </select>
      </li>
      <li>
        <p>名称：</p>
        <input type="text" v-model="name" />
      </li>
      <li>
        <p>价格：</p>
        <input type="number" v-model="price" />
      </li>
      <li>
        <p>图片：</p>
        <div class="img-box">
          <input type="file" id="upload" @change="uploadFile($event)" multiple="multiple" />
          <label for="upload">+</label>
          <div class="imgbg" :style="{backgroundImage: 'url('+showImg+')'}"></div>
        </div>
      </li>
      <li>
        <p>简介：</p>
        <textarea name="" v-model="desc"></textarea>
      </li>
      <li>
        <p>折扣：</p>
        <select name="" v-model="discount">
          <option value="null">无折扣</option>
          <option value="1">1折</option>
          <option value="2">2折</option>
          <option value="3">3折</option>
          <option value="4">4折</option>
          <option value="5">5折</option>
          <option value="6">6折</option>
          <option value="7">7折</option>
          <option value="8">8折</option>
          <option value="9">9折</option>
        </select>
      </li>
    </ul>
    <div class="sub">
      <button @click="subAdd">提交</button>
    </div>
  </div>
</template>

<script>
import { fetch } from '@/util/fetch';
import { Toast } from 'mint-ui';
import { qiniuUpload } from '@/plugins/qiniuUpload';
import { changeTitle, handleLocalStorage } from '@/util/common';
export default {
  name: "admin-home",
  data(){
    return {
      addType: 1,
      name: '',
      price: '',
      img: '',
      showImg: '',
      desc: '',
      discount: null
    }
  },
  created(){
    changeTitle('添加菜品');
  },
  methods:{
    uploadFile(event){
      let config = JSON.parse(handleLocalStorage('get', 'configInfo'));
      qiniuUpload('BC', event, (res)=>{
        console.log(res);
        this.img = res.key;
        this.showImg = config.qiniuDomain + res.key;
      })
    },
    subAdd(){
      if(this.name === ''){
        Toast('请填写菜品名称');
      }else if(this.price === ''){
        Toast('请填写菜品价格');
      }else if(this.img === ''){
        Toast('请填写菜品图片地址');
      }else if(this.desc === ''){
        Toast('请填写菜品简介');
      }else{
        fetch('post', 'commodity/add', {
          type: this.addType,
          name: this.name,
          price: this.price,
          img: this.img,
          desc: this.desc,
          discount: this.discount
        }, (res)=>{
          Toast(res);
          this.addType = 1;
          this.name = '';
          this.price = '';
          this.img = '';
          this.desc = '';
          this.discount = null;
        })
      }
    }
  }
}
</script>

<style scoped>

</style>
