import Vue from 'vue'
import Router from 'vue-router'

//个人中心
const Charge = () => import('@/views/pay/charge');

const Error = () => import('@/views/public/error');

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: '/jnwtv-pay-h5/',
  routes: [
    {
      path: '/charge',
      name: 'charge',
      component: Charge
    },
    {
      path: '/',
      redirect: '/charge'
    },
    {
      path: '*',
      name: 'error',
      component: Error
    }
  ]
})
