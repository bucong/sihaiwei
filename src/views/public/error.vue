<template>
  <div class="error contain">
    <img src="http://qiniu.jnwtv.com/H520180822134921559800889.png" alt="">
    <p>{{msg}}</p>
    <router-link to="/">返回首页</router-link>
  </div>
</template>

<script>
import { changeTitle } from '@/util/common';
export default {
  name: 'error',
  data () {
    return {
      msg: '对不起，您访问的页面飞走了！'
    }
  },
  created(){
    changeTitle('出错啦');
  }
}
</script>

<style scoped lang="scss">
.error{
	padding: .5rem 0;
	text-align: center;
	img{
    width: 1rem;
  }
	a{
		font-size: .16rem;
    display: block;
    margin: 0 auto;
    width: 2rem;
    line-height: .4rem;
    background: #18ac16;
    border-radius: .06rem;
    color: #fff;
	}
	p{
		font-size: .16rem;
		margin: .3rem;
	}
}
</style>
