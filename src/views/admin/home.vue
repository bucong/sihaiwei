<template>
  <div class="admin-home">
    <h1>订单</h1>
  </div>
</template>

<script>
import { changeTitle } from '@/util/common';
export default {
  name: "admin-home",
  data(){
    return {

    }
  },
  created(){
    changeTitle('订单管理');
  },
  methods:{

  }
}
</script>

<style scoped>

</style>
