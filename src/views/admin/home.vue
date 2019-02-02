<template>
  <div class="admin-home">
    <div class="flex search">
      <select name="" v-model="state">
        <option value="">订单状态</option>
        <option value="1">未接单</option>
        <option value="2">已接单</option>
        <option value="3">已取消</option>
        <option value="4">待评价</option>
        <option value="5">已完成</option>
      </select>
      <select name="" v-model="store">
        <option value="">门店</option>
        <option value="人民广场店">人民广场店</option>
        <option value="上海大学店">上海大学店</option>
        <option value="徐汇店">徐汇店</option>
        <option value="虹桥店">虹桥店</option>
        <option value="张江高科店">张江高科店</option>
      </select>
      <button @click="getOrder">搜索</button>
    </div>
    <div v-if="list.length > 0">
      <mt-loadmore :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" :autoFill="false" ref="loadmore">
        <ul class="list">
          <li v-for="item of list">
            <div class="flex show-detail" @click="showDetail(item.id)">
              <span class="id">{{item.id}}</span>
              <h6>{{item.times}}</h6>
              <span class="price">￥{{item.price}}</span>
              <span class="store">{{item.store}}</span>
            </div>
            <div class="operate" v-if="item.state === 1">
              <span>未接单</span>
              <button @click="acceptOrder(item.id)">接单</button>
              <button class="cancel" @click="cancelOrder(item.id)">取消</button>
            </div>
            <div class="operate" v-else-if="item.state === 2">
              <span style="color: #18ac16;">已接单</span>
              <button @click="finishOrder(item.id)">完成</button>
            </div>
            <div class="operate" v-else-if="item.state === 3">
              <span style="color: #999;">已取消</span>
            </div>
            <div class="operate" v-else-if="item.state === 4">
              <span style="color: #666;">待评价</span>
            </div>
            <div class="operate" v-else-if="item.state === 5">
              <span style="color: #999;">已完成</span>
            </div>
          </li>
        </ul>
      </mt-loadmore>
      <div class="load-more-info" v-if="!allLoaded">上拉加载更多</div>
    </div>
    <div v-else>
      <div class="no-data">
        <img src="http://qiniu.jnwtv.com/H520190202154530344083629.jpg" alt="">
        <p>空空如也~</p>
      </div>
    </div>
    <div class="meng" v-show="showDetailBox" @click="showDetailBox = false">
      <div class="show-detail-box" @click.stop="">
        <p>单号：{{detail.id}}</p>
        <ul>
          <li class="flex" v-for="item in detail.list">
            <div class="imgbg" :style="{backgroundImage: 'url('+item.img+')'}"></div>
            <h5>{{item.name}}</h5>
            <span>&times;{{item.num}}</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { changeTitle, transAllDate } from '@/util/common';
import { fetch } from '@/util/fetch';
import { Loadmore, MessageBox, Indicator } from 'mint-ui';
export default {
  name: "admin-home",
  data(){
    return {
      state: '',
      store: '',
      list: [],
      detail: {},
      showDetailBox: false,
      allLoaded: false,
      page: 1,
    }
  },
  created(){
    changeTitle('订单管理');
    this.getOrder();
  },
  methods:{
    getOrder(){
      this.page = 1;
      fetch('get', 'order/list', {
        state: this.state,
        store: this.store,
        page: this.page
      }, (res)=>{
        for(let item of res){
          item.times = transAllDate(item.times);
        }
        this.list = res;
        if(res.length <= 20){
          this.allLoaded = true;
        }else{
          this.allLoaded = false;
        }
      })
    },
    //下拉刷新
    loadTop(){
      this.getOrder();
      setTimeout(()=>{
        this.$refs.loadmore.onTopLoaded();
      }, 500);
    },
    //上拉加载
    loadBottom(){
      this.page ++;
      fetch('get', 'order/list', {
        state: this.state,
        store: this.store,
        page: this.page
      }, (res)=>{
        for(let item of res){
          item.times = transAllDate(item.times);
        }
        this.list.concat(res);
        if(res.length <= 20){
          this.allLoaded = true;
        }else{
          this.allLoaded = false;
        }
        this.$refs.loadmore.onBottomLoaded();
      })
    },
    showDetail(id){
      fetch('get', 'order/orderItem', {
        id: id
      }, (res)=>{
        this.detail = res;
        this.showDetailBox = true;
      })
    },
    acceptOrder(id){
      Indicator.open('加载中...');
      fetch('get', 'order/accept', {
        id: id
      }, (res)=>{
        for(let item of this.list){
          if(item.id === id){
            item.state = 2;
          }
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
    }
  },
  components: {
    'mt-loadmore': Loadmore
  }
}
</script>

<style scoped>

</style>
