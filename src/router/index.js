import Vue from 'vue'
import Router from 'vue-router'
import fuli from '../components/fuli.vue'

Vue.use(Router)

export default new Router({
  routes: [
    { path: '/', component: fuli},
    {
      path: '/fuli',
      name: 'fuli',
      component: fuli
    }
  ]
})
