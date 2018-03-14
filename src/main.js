// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import FastClick from "fastclick";
import VueRouter from "vue-router";
import App from "./App";
import router from "./router/index";
import VueLazyload from "vue-lazyload";
import VueAwesomeSwiper from "vue-awesome-swiper";
import "./assets/reset.css";
import store from "./vuex/store";

import  { LoadingPlugin } from 'vux'
Vue.use(LoadingPlugin)

import axios from './untils/ajaxRequest'
import  { AlertPlugin } from 'vux'

Vue.use(AlertPlugin)
Vue.use(VueRouter)
Vue.use(VueAwesomeSwiper)
Vue.use(VueLazyload, {
  preLoad: 1.3,
  error: 'static/9a8f82ebacaea7f31d3bf167440af6fa5c2451cb182bb-BGao9s_fw658.png',
  loading: 'static/dc7059cdff95c823e0de6550c4f25da0718e30963e31b-A3I9YE_fw658.gif',
  attempt: 1
})

FastClick.attach(document.body)

Vue.config.productionTip = false
Vue.prototype.$axios = axios
/* eslint-disable no-new */
let app=new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app-box')
export default app
