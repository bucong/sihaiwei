<template>
  <div class="evaluate-page">
    <h2>菜品评价</h2>
    <div class="info flex">
      <div class="imgbg" :style="{backgroundImage: 'url('+info.img+')'}"></div>
      <div class="content">
        <h5>{{info.name}}</h5>
        <div class="star flex" :class="'star'+star">
          <span class="choose-star" @click="chooseStar(1)"></span>
          <span class="choose-star" @click="chooseStar(2)"></span>
          <span class="choose-star" @click="chooseStar(3)"></span>
          <span class="choose-star" @click="chooseStar(4)"></span>
          <span class="choose-star" @click="chooseStar(5)"></span>
        </div>
      </div>
    </div>
    <div class="evaluate-content">
      <textarea name="" cols="30" rows="10" v-model="content"></textarea>
    </div>
    <input type="file" id="upload" @change="uploadFile($event)" multiple="multiple" />
    <ul class="imgs">
      <li class="add">
        <label for="upload">+</label>
      </li>
      <li v-for="item in imgs" class="imgbg" :style="{backgroundImage: 'url('+IMG+item+')'}"></li>
    </ul>
    <div class="sub">
      <button @click="sub">提交</button>
    </div>
  </div>
</template>

<script>
import { changeTitle, handleLocalStorage, getUrlParam } from '@/util/common';
import { fetch } from '@/util/fetch';
import { IMG } from '@/util/projectData';
import { Toast } from 'mint-ui';
export default {
  name: "evaluate-page",
  data(){
    return {
      userInfo: {},
      id: '',
      orderId: '',
      info: {},
      content: '',
      star: 5,
      imgs: [],
      IMG: IMG
    }
  },
  created(){
    this.userInfo = JSON.parse(handleLocalStorage('get', 'userInfo'));
    this.id = getUrlParam('id');
    this.orderId = getUrlParam('orderId');
    fetch('get', 'commodity/info', {
      id: this.id
    }, (res)=>{
      if(res){
        this.info = res;
        changeTitle(this.info.name);
      }else{
        Toast('该菜品不存在');
      }
    });
  },
  methods:{
    chooseStar(n){
      this.star = n;
    },
    uploadFile(event){
      if(this.imgs.length < 3){
        this.file = event.target.files[0];
        let param = new FormData(); // 创建form对象
        param.append('imgFile', this.file);//对应后台接收图片名
        fetch('post', 'upload/img', param, (res)=>{
          this.imgs.push(res);
        })
      }else{
        Toast('最多上传三张图片哦!');
      }
    },
    sub(){
      if(this.content === ''){
        Toast('请填写评价内容');
      }else{
        fetch('post', 'commodity/evaluateSub', {
          cId: this.id,
          orderId: this.orderId,
          userId: this.userInfo.id,
          content: this.content,
          star: this.star,
          imgs: this.imgs.join(','),
          times: new Date().getTime()
        }, (res)=>{
          Toast({message:'评价成功', duration: 1000});
          setTimeout(()=>{
            this.$router.go(-1);
          }, 1000);
        })
      }
    }
  }
}
</script>

<style scoped>

</style>
