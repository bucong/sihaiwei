<template>
  <div class="admin-commodity">
    商品列表，增删改查
  </div>
</template>

<script>
import { changeTitle } from '@/util/common';
export default {
  name: "admin-commodity",
  data(){
    return {

    }
  },
  created(){
    changeTitle('菜品管理');
  }
}
</script>

<style scoped>

</style>
