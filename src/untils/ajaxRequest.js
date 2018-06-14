import axios from 'axios'
import app from '../main'

let serverpath = 'http://127.0.0.1:5000'//'http://176.122.129.216:5000'

//创建axios实例
let instance = axios.create({
  baseURL: serverpath,
  timeout: 30 * 1000,
  cache: false,
  headers: {
    'Access-Control-Allow-Origin':'*'
  }
})

//发起请求前拦截
instance.interceptors.request.use(function (config) {
  app.$vux.loading.show({
    text: 'Loading'
  })
  return config;
}, function (error) {
  // Do something with request error
  return Promise.reject(error);
})

//发起请求后拦截
instance.interceptors.response.use(function (response) {
  app.$vux.loading.hide()
  return response
}, function (error) {
  app.$vux.loading.hide()
  app.$vux.alert.show({
    content:'网络连接错误'
  })
  // Do something with response error
  return Promise.reject(error);
})

export default instance
