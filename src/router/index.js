import Vue from "vue";
import Router from "vue-router";
import fuli from "../components/fuli.vue";
import dayNews from "../components/dayNews.vue";
import random from "../components/random.vue";
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect:'/login'
    }, {
      path: '/fuli',
      name: 'fuli',
      component: fuli
    }, {
      path: '/dayNews',
      name: 'dayNews',
      component: dayNews
    }, {
      path: '/random',
      name: 'random',
      component: random
    },{
      path: '/login',
      name: 'login',
      component: resolve=>require(['../components/login.vue'],resolve)
    }
  ]
})
