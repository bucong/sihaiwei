<template>
  <div class="admin-commodity">
    <ul>
      <li class="flex" v-for="item in list">
        <div class="imgbg img-cover" :style="{backgroundImage: 'url('+item.img+')'}"></div>
        <div class="content">
          <div class="flex">
            <h5>{{item.name}}</h5>
            <h6>￥{{item.price}}</h6>
          </div>
          <div class="describe">
            <span v-if="item.type === 1">类型：主食</span>
            <span v-else-if="item.type === 2">类型：海鲜</span>
            <span v-else-if="item.type === 3">类型：配菜</span>
            <span v-else-if="item.type === 4">类型：饮品</span>
            <span v-if="item.discount">折扣：{{item.discount}}</span>
            <span v-else>折扣：无</span>
            <span>点赞：{{item.praise}}</span>
            <span>销量：{{item.salesVolume}}</span>
          </div>
          <p class="one-line">{{item.desc}}</p>
          <div class="operate">
            <router-link :to="{path: '/admin/update?id='+item.id}" class="btn update">修改</router-link>
            <button class="btn delete" @click="deleteItem(item.id)">删除</button>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { changeTitle } from '@/util/common';
import { fetch } from '../../util/fetch';
import { MessageBox, Toast } from 'mint-ui';
export default {
  name: "admin-commodity",
  data(){
    return {
      list: [],
    }
  },
  created(){
    changeTitle('菜品管理');
    fetch('get', 'commodity/list', {}, (res)=>{
      this.list = res;
    });
  },
  methods:{
    updateItem(id){

    },
    deleteItem(id){
      MessageBox.confirm('确定执行此操作?').then(action => {
        if(action){
          fetch('get', 'commodity/delete', {
            id: id
          }, (res)=>{
            for(let i = 0;i < this.list.length;i ++){
              if(this.list[i].id === id){
                this.list.splice(i, 1);
              }
            }
            Toast({
              message: '删除成功',
              position: 'bottom'
            })
          })
        }
      });
    }
  }
}
</script>

<style scoped>

</style>
