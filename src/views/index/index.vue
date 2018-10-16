<template>
  <div class="contain">
    <h2>点餐首页</h2>
    <router-link to="/admin">后台管理系统</router-link>
  </div>
</template>

<script>
import { fetch } from '@/util/fetch';
import { Toast, Indicator } from 'mint-ui';
export default {
  name: 'index',
  data () {
    return {

    }
  },
  created(){
    fetch('get', 'user', {
      account: '17621960934'
    }, (res)=>{

    })
  },
  methods:{

  },
  components:{

  }
}
</script>

<style scoped>

</style>
