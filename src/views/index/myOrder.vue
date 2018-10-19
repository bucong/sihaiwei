<template>
  <div class="my-order">
    <div v-if="list.length > 0">
      
    </div>
    <div v-else>
      <div class="no-data">
        <img src="../../../static/img/no-data.jpg" alt="">
        <p>空空如也~</p>
      </div>
    </div>
  </div>
</template>

<script>
  import { changeTitle } from '../../util/common';
export default {
  name: "myOrder",
  data(){
    return {
      list: []
    }
  },
  created(){
    changeTitle('我的订单');
  }
}
</script>

<style scoped>

</style>
