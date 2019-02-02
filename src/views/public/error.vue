<template>
  <div class="error contain">
    <img src="http://qiniu.jnwtv.com/H520190202154301650991279.png" alt="">
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
	padding: 1rem 0;
	text-align: center;
	img{
    width: 2rem;
  }
	a{
		font-size: .32rem;
    display: block;
    margin: 0 auto;
    width: 4rem;
    line-height: .8rem;
    background: #ffc107;
    border-radius: .12rem;
    color: #fff;
	}
	p{
		font-size: .31rem;
		margin: .6rem;
	}
}
</style>
