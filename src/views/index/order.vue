<template>
  <div class="order">
    <div class="banner">
      <h1>四海味</h1>
      <div class="store">
        <i class="iconfont">&#xe653;</i>
        <select name="" v-model="store">
          <option value="人民广场店">人民广场店</option>
          <option value="上海大学店">上海大学店</option>
          <option value="徐汇店">徐汇店</option>
          <option value="虹桥店">虹桥店</option>
          <option value="张江高科店">张江高科店</option>
        </select>
      </div>
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
            <div class="add" @click="addCommodity(item.id)">+</div>
          </div>
        </li>
      </ul>
    </div>
    <div class="order-meng meng" v-show="cartShow">
      <div class="meng-box">
        <h2 class="flex"><span></span><span>购物车</span><span @click="cartShow = false">&times;</span></h2>
        <ul v-if="money > 0">
          <li v-for="item in list">
            <div class="flex item" v-if="item.num && item.num !== 0">
              <h5>{{item.name}}</h5>
              <div class="price" v-if="item.discount">￥{{item.price * item.discount / 10}}</div>
              <div class="price" v-else>￥{{item.price}}</div>
              <div class="operation flex">
                <span class="do" @click="reduceCommodity(item.id)">-</span>
                <div>{{item.num}}</div>
                <span class="do" @click="addCommodity(item.id)">+</span>
              </div>
            </div>
          </li>
        </ul>
        <div class="no-data" v-else>
          <img src="http://qiniu.jnwtv.com/H520190202154530344083629.jpg" alt="">
          <p>空空如也~</p>
        </div>
      </div>
    </div>
    <div style="height: 1rem"></div>
    <div class="state flex">
      <router-link to="/myOrder" class="user">
        <img :src="userInfo.figureurl" alt="">
        <h2>{{userInfo.name}}</h2>
      </router-link>
      <div class="content" @click="cartShow = true">
        <img src="http://qiniu.jnwtv.com/H520190202154459999734968.png" alt="">
        <h5>￥{{money.toFixed(2)}}</h5>
        <span v-show="orderNum > 0">{{orderNum}}</span>
      </div>
      <button @click="subOrder">下单</button>
    </div>
  </div>
</template>

<script>
import { handleLocalStorage, changeTitle } from '@/util/common';
import { fetch } from '@/util/fetch';
import { Toast } from 'mint-ui';
export default {
  name: "order",
  data(){
    return {
      userInfo: {},
      list: [],
      money: 0,
      orderNum: 0,
      cartShow: false, //显示购物车
      store: '人民广场店'
    }
  },
  created(){
    this.userInfo = JSON.parse(handleLocalStorage('get', 'userInfo'));
    fetch('get', 'commodity/list', {}, (res)=>{
      let listMap = {};
      for(let item of res){
        item.num = 0;
        listMap[item.id] = item;
      }
      this.list = listMap;
    });
    changeTitle('点餐');
  },
  methods:{
    addCommodity(id){
      this.orderNum ++;
      this.list[id].num ++;
      let thisMoney = this.list[id].price;
      if(this.list[id].discount){
        thisMoney = this.list[id].price * this.list[id].discount / 10;
      }
      this.money += thisMoney;
    },
    reduceCommodity(id){
      this.orderNum --;
      this.list[id].num --;
      let thisMoney = this.list[id].price;
      if(this.list[id].discount){
        thisMoney = this.list[id].price * this.list[id].discount / 10;
      }
      this.money -= thisMoney;
      if(this.money < 0){
        this.money = 0;
      }
    },
    subOrder(){
      if(this.money <= 0){
        Toast({
          message: '您还啥都没点呢！',
          position: 'bottom'
        })
      }else{
        let orderList = [];
        let subList = this.list;
        for(let i in subList){
          if(subList[i].num && subList[i].num !== 0){
            orderList.push({
              id: subList[i].id,
              num: subList[i].num
            });
          }
        }
        fetch('post', 'order/add', {
          userId: this.userInfo.id,
          times: new Date().getTime(),
          price: this.money,
          store: this.store,
          list: JSON.stringify(orderList)
        }, (res)=>{
          Toast('下单成功');
          setTimeout(()=>{
            this.$router.push({path: '/myOrder'});
          }, 1000)
        })
      }
    }
  }
}
</script>

<style scoped>

</style>
