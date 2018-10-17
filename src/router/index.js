import Vue from 'vue'
import Router from 'vue-router'
import { handleLocalStorage } from '@/util/common';
import { thirdLogin } from '@/util/thirdLogin';
//点餐
const Index = () => import('@/views/index/index');
const Order = () => import('@/views/index/order');

//后台管理
const Admin = () => import('@/views/admin/index');
const AdminHome = () => import('@/views/admin/home');
const adminLogin = () => import('@/views/admin/login');

const Error = () => import('@/views/public/error');

Vue.use(Router);

export default new Router({
  mode: 'history',
  // base: 'sihaiwei',
  routes: [
    {
      path: '/',
      name: 'index',
      component: Index
    },
    {
      path: '/order',
      name: 'order',
      component: Order,
      beforeEnter:(to,from,next)=>{
        let login = handleLocalStorage('get', 'userInfo');
        if(login){
          next();  //next({path: '/'})为跳转到首页
        }else{
          thirdLogin();
        }
      }
    },
    //后台管理系统
    {
      path: '/admin',
      component: Admin,
      redirect:'/admin/home',
      children:[
        {
          path: 'home',
          name: 'adminHome',
          component: AdminHome,
          beforeEnter:(to,from,next)=>{
            let login = handleLocalStorage('get', 'adminInfo');
            if(login){
              next();  //next({path: '/'})为跳转到首页
            }else{
              next({path: '/admin/login'})
            }
          }
        }
      ]
    }, {
      path: '/admin/login',
      name: 'adminLogin',
      component: adminLogin
    },
    //404
    {
      path: '*',
      name: 'error',
      component: Error
    }
  ]
})
