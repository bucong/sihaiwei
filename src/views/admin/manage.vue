<template>
  <div class="admin-manage">
    <h1>首页展示图配置</h1>
    <input type="file" id="upload" @change="uploadFile($event)" multiple="multiple" />
    <ul>
      <li v-for="(item, i) in list" class="flex">
        <label for="upload" class="imgbg" @click="uploadId = item.id;sub = i" :style="{backgroundImage: 'url('+IMG+item.img+')'}"></label>
        <div class="operate flex">
          <span><i class="iconfont up" @click="upMove(item.id, item.sort, i)">&#xe67c;</i></span>
          <span><i class="iconfont down" @click="downMove(item.id, item.sort, i)">&#xe6ac;</i></span>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { changeTitle, handleLocalStorage, getUrlParam } from '@/util/common';
import { fetch } from '@/util/fetch';
import { IMG } from '@/util/projectData';
import { Toast, Indicator } from 'mint-ui';
export default {
  name: "manage",
  data(){
    return {
      list: [],
      uploadId: '', //替换图片id
      sub: '', //替换图片下标
      IMG: IMG
    }
  },
  created(){
    changeTitle('配置首页图片');
    this.getList();
  },
  methods:{
    getList(){
      fetch('get', 'img/list', {
        imgType: 1
      }, (res)=>{
        this.list = res;
      })
    },
    uploadFile(event){
      this.file = event.target.files[0];
      let param = new FormData(); // 创建form对象
      param.append('imgFile', this.file);//对应后台接收图片名
      fetch('post', 'upload/img', param, (res)=>{
        let imgUrl = res;
        fetch('get', 'img/set', {
          id: this.uploadId,
          img: imgUrl
        }, ()=>{
          this.list[this.sub].img = imgUrl;
          Toast({message: '上传成功', position: 'bottom'});
        })
      })
    },
    upMove(id, sort, i){
      Indicator.open('加载中。。。');
      fetch('get', 'img/moveSort', {
        exchangeId1: id,
        sort1: sort,
        exchangeId2: this.list[i-1].id,
        sort2: this.list[i-1].sort,
      }, (res)=>{
        this.list = [];
        this.getList();
      })
    },
    downMove(id, sort, i){
      Indicator.open('加载中。。。');
      fetch('get', 'img/moveSort', {
        exchangeId1: id,
        sort1: sort,
        exchangeId2: this.list[i+1].id,
        sort2: this.list[i+1].sort,
      }, (res)=>{
        this.list = [];
        this.getList();
      })
    }
  }
}
</script>

<style scoped>

</style>
