<template>
  <div class="my-order">
    <div v-if="list.length > 0"></div>
    <div v-else>
      <div class="no-data">
        <img src="../../../static/img/no-data.jpg" alt="">
        <p>空空如也~</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "myOrder",
  data(){
    return {
      list: []
    }
  }
}
</script>

<style scoped>

</style>
