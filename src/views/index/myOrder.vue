<template>
  <div class="my-order">
    <div v-if="list.length > 0">
      <ul>
        <li v-for="item in this.list">
          <router-link :to="{path: '/orderDetail?id='+item.id}">
            <div class="store flex">
              <div class="flex">
                <img src="http://qiniu.jnwtv.com/H520190202154301650991279.png" alt="">
                <h3>{{item.store}}</h3>
              </div>
              <div class="state">
                <span v-if="item.state === 1">未接单</span>
                <span v-else-if="item.state === 2">已接单</span>
                <span v-else-if="item.state === 3">已取消</span>
                <span v-else-if="item.state === 4">待评价</span>
                <span v-else-if="item.state === 5">已完成</span>
              </div>
            </div>
            <div class="info">
              <p>订单号：{{item.id}}</p>
              <p>时间：{{item.times}}</p>
              <p>总价：{{item.price}}</p>
            </div>
          </router-link>
          <div class="operate">
            <button v-if="item.state === 1" @click="cancelOrder(item.id)">取消订单</button>
            <button v-if="item.state === 2" @click="finishOrder(item.id)">完成订单</button>
            <button v-if="item.state === 3" @click="deleteOrder(item.id)">删除订单</button>
            <router-link :to="{path: '/orderDetail?id='+item.id}" v-else-if="item.state === 4">去评价</router-link>
          </div>
        </li>
      </ul>
    </div>
    <div v-else>
      <div class="no-data">
        <img src="http://qiniu.jnwtv.com/H520190202154530344083629.jpg" alt="">
        <p>空空如也~</p>
      </div>
    </div>
  </div>
</template>

<script>
import { changeTitle, handleLocalStorage, transAllDate } from '@/util/common';
import { fetch } from '@/util/fetch';
import { MessageBox, Toast } from 'mint-ui';
export default {
  name: "myOrder",
  data(){
    return {
      userInfo: {},
      list: []
    }
  },
  created(){
    this.userInfo = JSON.parse(handleLocalStorage('get', 'userInfo'));
    changeTitle('我的订单');
    fetch('get', 'order/userOrder', {
      userId: this.userInfo.id
    }, (res)=>{
      for(let item of res){
        item.times = transAllDate(item.times);
      }
      this.list = res;
    })
  },
  methods:{
    cancelOrder(id){
      MessageBox.confirm('确定执行此操作?').then(action => {
        if(action){
          fetch('get', 'order/cancel', {
            id: id
          }, (res)=>{
            for(let item of this.list){
              if(item.id === id){
                item.state = 3;
              }
            }
          })
        }
      })
    },
    finishOrder(id){
      fetch('get', 'order/finish', {
        id: id
      }, (res)=>{
        for(let item of this.list){
          if(item.id === id){
            item.state = 4;
          }
        }
      })
    },
    deleteOrder(id){
      MessageBox.confirm('确定执行此操作?').then(action => {
        if(action){
          fetch('get', 'order/delete', {
            id: id
          }, (res)=>{
            Toast({
              message: '删除订单成功',
              position: 'bottom'
            });
            for(let i=0;i<this.list.length;i++){
              if(this.list[i].id === id){
                this.list.splice(i,1);
              }
            }
          })
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
