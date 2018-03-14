import Vue from "vue";
import Router from "vue-router";
import fuli from "../components/fuli.vue";
import dayNews from "../components/dayNews.vue";
import random from "../components/random.vue";
Vue.use(Router)

const router= new Router({
  routes: [
    {
      path: '/',
      redirect:'/dayNews'
    }, {
      path: '/fuli',
      name: '妹子图',
      component: fuli
    }, {
      path: '/dayNews',
      name: '每日干货',
      component: dayNews
    }, {
      path: '/random',
      name: '随便看看',
      component: random
    },{
      path: '/login',
      name: '登陆/注册',
      component: resolve=>require(['../components/login.vue'],resolve)
    },{
    path:'/collection',
      name:'我的收藏',
      component: resolve=>require(['../components/collection.vue'],resolve)
    }
  ]
})
export default router
