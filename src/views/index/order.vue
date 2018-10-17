<template>
  <div class="order">
    <div class="banner">
      <h1>四海味</h1>
    </div>
    <div class="order-list">
      <ul>
        <li v-for="item in list">
          <router-link :to="{path: '/detail?id='+item.id}" class="imgbg" v-lazy:background-image="{src: item.img}"></router-link>
          <div class="discount" v-if="item.discount">{{item.discount}}折</div>
          <h4>{{item.name}}</h4>
          <div class="flex">
            <div v-if="item.discount" class="price">￥{{item.price * item.discount / 10}}<span>{{item.price}}</span></div>
            <div v-else class="price">￥{{item.price}}</div>
            <div class="add">+</div>
          </div>
        </li>
      </ul>
    </div>
    <div class="state flex">
      <div class="user">
        <img :src="userInfo.figureurl" alt="">
        <h2>{{userInfo.name}}</h2>
      </div>
      <div class="content" @click="showOrderList">
        <img src="../../../static/img/icon-cart.png" alt="">
        <h5>￥{{money}}</h5>
        <span v-show="orderNum > 0">{{orderNum}}</span>
      </div>
      <button @click="subOrder">下单</button>
    </div>
  </div>
</template>

<script>
import { handleLocalStorage } from '../../util/common';
import { fetch } from '../../util/fetch';
export default {
  name: "order",
  data(){
    return {
      userInfo: {},
      list: [],
      money: 0,
      orderNum: 3,
    }
  },
  created(){
    this.userInfo = JSON.parse(handleLocalStorage('get', 'userInfo'));
    fetch('get', 'commodity/list', {}, (res)=>{
      this.list = res;
    })
  },
  methods:{
    subOrder(){

    },
    showOrderList(){

    }
  }
}
</script>

<style scoped>

</style>
