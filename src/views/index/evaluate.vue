<template>
  <div class="evaluate-page">
    <h2>菜品评价</h2>
    <div class="info flex">
      <div class="imgbg" :style="{backgroundImage: 'url('+info.img+')'}"></div>
      <div class="content">
        <h5>{{info.name}}</h5>
        <div class="star">
          五颗星
        </div>
      </div>
    </div>
    <div>菜品id：{{id}}</div>
    <div>订单orderId：{{orderId}}</div>
    <div>用户id：{{userInfo.id}}</div>
  </div>
</template>

<script>
import { changeTitle, handleLocalStorage, getUrlParam } from '@/util/common';
import { fetch } from '@/util/fetch';
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
      imgs: []
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
    sub(){
      if(this.content === ''){
        Toast('请填写评价内容');
      }else{
        fetch('post', 'commodity/evaluateSub', {
          cId: this.id,
          userId: this.userInfo.id,
          content: this.content,
          star: this.star,
          imgs: this.imgs.split(','),
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
