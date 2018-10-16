import Vue from 'vue'
import Router from 'vue-router'
import { handleLocalStorage } from '@/util/common'
//点餐
const Index = () => import('@/views/index/index');

//后台管理
const Admin = () => import('@/views/admin/index');
const AdminHome = () => import('@/views/admin/home');
const adminLogin = () => import('@/views/admin/login');

const Error = () => import('@/views/public/error');

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'index',
      component: Index
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
            let login = handleLocalStorage('get', 'userInfo');
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
