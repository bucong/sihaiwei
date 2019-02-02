<template>
  <div class="order-detail">
    <div class="padding">
      <div class="store">
        <img src="http://qiniu.jnwtv.com/H520190202154301650991279.png" alt="">
        <h3>{{info.store}}</h3>
      </div>
      <div class="state">
        <i>---</i>
        <span v-if="info.state === 1">未接单</span>
        <span v-else-if="info.state === 2">已接单</span>
        <span v-else-if="info.state === 3">已取消</span>
        <span v-else-if="info.state === 4">待评价</span>
        <span v-else-if="info.state === 5">已完成</span>
        <i>---</i>
      </div>
      <ul class="list">
        <li class="flex" v-for="item in info.list">
          <div class="imgbg" :style="{backgroundImage: 'url('+item.img+')'}"></div>
          <h5 class="one-line">{{item.name}}</h5>
          <span class="price">￥{{item.price}}</span>
          <span>&times;{{item.num}}</span>
          <router-link v-if="info.state >= 4" :to="{path: '/evaluate?id='+item.id+'&orderId='+orderId}">评价</router-link>
        </li>
      </ul>
      <div class="info">
        <p>时间：{{info.times}}</p>
        <p>总价：￥{{info.price}}</p>
      </div>
    </div>
    <div class="share">
      <img src="http://qiniu.jnwtv.com/H520190202154716670201018.png" width="100%" alt="">
    </div>
  </div>
</template>

<script>
import { changeTitle, handleLocalStorage, transAllDate, getUrlParam } from '@/util/common';
import { fetch } from '@/util/fetch';
import { Toast } from 'mint-ui';
export default {
  name: "order-detail",
  data(){
    return {
      orderId: '', //订单id
      info: {}
    }
  },
  created(){
    this.userInfo = JSON.parse(handleLocalStorage('get', 'userInfo'));
    this.orderId = getUrlParam('id');
    changeTitle('订单详情');
    fetch('get', 'order/orderItem', {
      id: this.orderId
    }, (res)=>{
      if(res){
        res.times = transAllDate(res.times);
        this.info = res;
      }else{
        Toast('该订单飞走了。。。')
      }
    })
  }
}
</script>

<style scoped>

</style>
