<template>
  <div class="commodity-detail">
    <div class="banner">
      <div class="imgbg back" :style="{backgroundImage: 'url('+info.img+')'}"></div>
      <img :src="info.img" alt="">
    </div>
    <div class="info">
      <h3>{{info.name}}</h3>
      <div class="flex">
        <h5>￥{{info.price}}</h5>
        <div>
          <span>销量：{{info.salesVolume}}</span>
          <span>赞：{{info.praise}}</span>
        </div>
      </div>
      <p>{{info.desc}}</p>
    </div>
    <div class="evaluate">
      <h4>菜品评价</h4>
      <div v-if="evaluate.length > 0" class="evaluate-list">
        <ul>
          <li v-for="item in evaluate">
            <img :src="item.userFigure" class="user-head" alt="">
            <div class="content">
              <div class="flex">
                <h5>{{item.userName}}</h5>
                <span>{{item.times}}</span>
              </div>
              <p>{{item.content}}</p>
              <div class="imgs" v-if="item.imgs">
                <div v-for="img in item.imgs"></div>
              </div>
            </div>
          </li>
        </ul>
      </div>
      <div v-else class="no-data">
        <img src="../../../static/img/no-data.jpg" alt="">
        <p>空空如也~</p>
      </div>
    </div>
  </div>
</template>

<script>
import { fetch } from "../../util/fetch";
import { getUrlParam, transDate } from "../../util/common";
import { Toast } from 'mint-ui';
export default {
  name: "commodity-detail",
  data(){
    return {
      id: '',
      info: {},
      evaluate: []
    }
  },
  created(){
    this.id = getUrlParam('id');
    fetch('get', 'commodity/info', {
      id: this.id
    }, (res)=>{
      if(res.info){
        this.info = res.info;
        for(let item of res.evaluate){
          item.times = transDate(item.times);
        }
        this.evaluate = res.evaluate;
      }else{
        Toast('该菜品不存在');
      }
    })
  }
}
</script>

<style scoped>

</style>
