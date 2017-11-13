import Vue from "vue";
import Router from "vue-router";
import fuli from "../components/fuli.vue";
import dayNews from "../components/dayNews.vue";
Vue.use(Router)

export default new Router({
  routes: [
    {path: '/', component: dayNews},
    {
      path: '/fuli',
      name: 'fuli',
      component: fuli
    }, {
      path: '/dayNews',
      name: 'dayNews',
      component: dayNews
    }
  ]
})
